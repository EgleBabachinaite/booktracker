export class HttpError {
    code: HttpStatusCode;
    message: string;

    constructor(message: string, code: HttpStatusCode = HttpStatusCode.InternalServerError) {
        this.code = code;
        this.message = message;
    }
}

export enum HttpStatusCode {
    OK = 200,
    Created = 201,
    InternalServerError = 500,
    BadRequest = 400,
    Conflict = 409,
    NotFound = 404,
    Unauthorized = 401
}



