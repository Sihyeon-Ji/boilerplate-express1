import express from "express";
import _ from "lodash";
import { getUserBySessionToken } from "models/mongo/users";

export const isAuthenticated = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const sessionToken = req.cookies["AUTH-COOKIE"];

	if (!sessionToken) {
		return res.sendStatus(403);
	}

	const existingUser = await getUserBySessionToken(sessionToken);

	if (!existingUser) {
		return res.sendStatus(403);
	}

	_.merge(req, { identity: existingUser });

	return next();
};

export const isOwner = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const { id } = req.params;
	const currentUserId = String(_.get(req, "identity._id"));

	if (!currentUserId) {
		return res.sendStatus(400);
	}

	if (currentUserId.toString() !== id) {
		return res.sendStatus(403);
	}

	next();
};

// import { RequestHandler } from "express";
// import passport from "passport";
// import { JWTService } from "../services";

/**
 * NOTE
 * JWT 인증 예시 코드입니다.
 * */

//  // 미사용 코드
//  // export const authJWT: RequestHandler = (req, res, next) => {
//  //   if (!req.headers.authorization || !req.headers.refresh) {
//  //     res.status(400).send({
//  //       success: false,
//  //       message: "Access token and refresh token are need for refresh!",
//  //     });
//  //     return;
//  //   }

//  //   const accessToken = req.headers.authorization.split("bearer ")[1];
//  //   const result = JWTService.verify(accessToken);

//  //   if (!result.success) {
//  //     res.status(401).send({
//  //       message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
//  //     });
//  //     return;
//  //   }
//  //   next();
//  // };

// export const requireJWT: RequestHandler = (req, res, next) =>
// 	passport.authenticate("jwt", { session: false }, (error, user) => {
// 		if (!user) {
// 			throw {
// 				status: 401,
// 				message: "No auth",
// 			};
// 		}

// 		req.user = {
// 			id: user.id,
// 			name: user.name,
// 		};
// 		next();
// 	})(req, res, next);
