import { Request, Response } from "express";
import { asyncErrorCatcher } from "middlewares/errorHandlerMiddleware";

export const returnTrueFunction = (_req: Request, _res: Response) => {
	return true;
};
