import { CustomError } from "./customError";

//🔥 InternalServerError
export class InternalServerError extends CustomError {
	constructor(message: string) {
		super(message, 500);
	}
}
