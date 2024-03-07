import { Request, Response } from "express";
import { createUser, getUserByEmail } from "models/mongo/users";
import { Service } from "typedi";
import { authentication } from "utils/authUtils";
import { makeRandomString } from "utils/stringUtils";

@Service()
export default class authService {
	public login = async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const user = await getUserByEmail(email).select(
			"+authentication.salt +authentication.password", //NOTE 중요
		);

		if (!user) {
			return 400;
		}

		const expectedHash = authentication(user.authentication.salt, password);

		if (user.authentication.password != expectedHash) {
			return 403;
		}

		const salt = makeRandomString();
		user.authentication.sessionToken = authentication(
			salt,
			user._id.toString(),
		);

		await user.save();

		res.cookie("AUTH-COOKIE", user.authentication.sessionToken, {
			domain: "localhost",
			path: "/",
		});

		return user;
	};

	public register = async (req: Request) => {
		const { email, password, username } = req.body;

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return 400;
		}

		const salt = makeRandomString();

		const user = await createUser({
			email,
			username,
			authentication: {
				salt,
				password: authentication(salt, password),
			},
		});

		return user;
	};
}

/**
 * NOTE
 * JWT 인증 예시 코드입니다.
 * */

// const JWT_SECRET = process.env.JWT_SECRET || "s";
// const JWT_ALGORITHM = "HS256";
// const ACCESS_EXPIRES_TIME = "1d";
// const REFRESH_EXPIRES_TIME = "14d";

// export const JWTService = {
// 	sign: (user: UserDTO) => {
// 		return jwt.sign(user, JWT_SECRET, {
// 			algorithm: JWT_ALGORITHM,
// 			expiresIn: ACCESS_EXPIRES_TIME,
// 		});
// 	},
// 	verify: (token: string) => {
// 		try {
// 			const decoded = jwt.verify(token, JWT_SECRET) as UserDTO;

// 			return {
// 				success: true,
// 				user: decoded,
// 			};
// 		} catch (err: any) {
// 			return {
// 				success: false,
// 				message: err.message,
// 			};
// 		}
// 	},
// 	refresh: () => {
// 		return jwt.sign({}, JWT_SECRET, {
// 			algorithm: JWT_ALGORITHM,
// 			expiresIn: REFRESH_EXPIRES_TIME,
// 		});
// 	},
// };
