import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { BadRequest } from "lib/errors/badRequest";
import { CustomError } from "lib/errors/customError";
import { InternalServerError } from "lib/errors/internalServerError";

// NOTE 기본 에러 핸들러 미들웨어
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorResponser: ErrorRequestHandler = (err, _req, res, _next) => {
	console.error("에러 발생: ", err);
	if (
		err instanceof CustomError ||
		err instanceof BadRequest ||
		err instanceof InternalServerError
	) {
		res.status(err.statusCode).json({ error: err.message });
	} else {
		// 그 외의 서버 오류
		res.status(500).json({ error: "서버 에러 발생" });
	}
};

/**NOTE 비동기 에러 핸들러 미들웨어
 * express로 에러를 알리기 위해서는 throw new Error()를 하거나 next()를 사용해야 한다.
 * 그러나 전자에서는 비동기로 에러를 던질 경우 에러를 잡지 못한다.
 * 따라서 비동기 에러가 발생하는 경우, 비동기 에러를 잡을 수 있도록 처리가 필요한데, 아래 함수가 바로 그것이다.
 * 간단하게 async 함수를 이 함수로 감싸주어, try-catch문을 생략함과 동시에 비동기 에러도 잡을 수 있게 해준다.
 * Promise 객체를 반환하는 async 함수에 사용해야 함을 주의
 */
export const asyncErrorCatcher =
	(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error: any) {
			// 모든 오류를 .catch() 처리 후 next() 미들웨어에 전달
			next(error);
		}
	};
