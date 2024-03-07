import { Request, Response } from "express";
import authService from "services/authService";
import { Container } from "typedi";
//SECTION - authController
/**
 * 로그인, 로그아웃, 회원가입 등 인증 관련 컨트롤러
 * @author Sean <shji@dtol.co.kr>
 */

// 의존 관계주입
const authServices = Container.get(authService);

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// 요청이 이상하다. 바로 에러처리
	if (!email || !password) {
		return res.sendStatus(400);
	}

	// 서비스 호출
	const login = await authServices.login(req, res);

	if (login == 400) {
		return res.sendStatus(400);
	} else if (login == 403) {
		return res.sendStatus(403);
	} else {
		return res.status(200).json(login).end();
	}
};

export const register = async (req: Request, res: Response) => {
	const { email, password, username } = req.body;

	// 요청이 이상하다. 바로 에러처리
	if (!email || !password || !username) {
		return res.sendStatus(400);
	}

	// 서비스 호출
	const register = await authServices.register(req);

	if (register == 400) {
		return res.sendStatus(400);
	} else {
		return res.status(200).json(register).end();
	}
};

//!SECTION
