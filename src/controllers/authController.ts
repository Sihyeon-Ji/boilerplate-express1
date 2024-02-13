import { Request, Response } from "express";
import { createUser, getUserByEmail } from "models/mongo/users";
import { makeRandomString } from "utils/stringUtils";
import { authentication } from "utils/authUtils";
//SECTION - authController
/**
 * 로그인, 로그아웃, 회원가입 등 인증 관련 컨트롤러
 * @author Sean <shji@dtol.co.kr>
 */

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.sendStatus(400);
		}

		const user = await getUserByEmail(email).select(
			"+authentication.salt +authentication.password", //NOTE 중요
		);

		if (!user) {
			return res.sendStatus(400);
		}

		const expectedHash = authentication(user.authentication.salt, password);

		if (user.authentication.password != expectedHash) {
			return res.sendStatus(403);
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

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, username } = req.body;

		if (!email || !password || !username) {
			return res.sendStatus(400);
		}

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return res.sendStatus(400);
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

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

//!SECTION
