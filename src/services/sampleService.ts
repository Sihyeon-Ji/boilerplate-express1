import { Request, Response } from "express";

/**
 *
 * repository를 사용하여 비즈니스 로직을 처리하고, controller에게 결과를 반환하는 역할
 */

export const returnTrueFunction = (_req: Request, _res: Response) => {
	return true;
};
