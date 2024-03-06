import { CustomError } from "./customError";

//🔥 BadRequest
export class BadRequest extends CustomError {
	constructor(message: string) {
		super(message, 400);
	}
}
