import {
	ErrorRequestHandler,
	RequestHandler,
	Request,
	Response,
	NextFunction,
} from "express";

export const asyncErrorCatcher =
	(fn: RequestHandler) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (e: any) {
			next(e);
		}
	};

// error handling route must accept 4 arguments for express to identify it as an error middleware.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorResponser: ErrorRequestHandler = (err, req, res, _next) => {
	const { status, message } = err;
	console.log(err);
	res.status(status || 500).json({ message });
};
