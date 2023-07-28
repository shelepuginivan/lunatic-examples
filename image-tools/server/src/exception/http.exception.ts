export class HttpException extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}

export class BadRequest extends HttpException {
	constructor(message: string) {
		super(400, message);
	}
}
