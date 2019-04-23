import * as jwt from 'jsonwebtoken';
import {validate, ValidationError} from "class-validator";
import {HttpError, HttpStatusCode} from "../http/HttpError";

export class Utility {
    public static JWTKey = 'ewzrxtcfygvhbjkn12375%^$';

    public static ValidateEmail(email: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public static VerifyToken(token: string): any {

        try {
            let decodedJson = jwt.verify(token, Utility.JWTKey);

            return decodedJson;
        } catch {
            return false;
        }
    }

    public static ValidateModel<T>(model: T): Promise<T> {
        return new Promise((resolve, reject) => {
            validate(model)
                .then((errors: ValidationError[]) => {
                    if (errors.length > 0) {
                        console.log(errors);
                        reject(new HttpError(`Property ${errors[0].property} is invalid`, HttpStatusCode.BadRequest));
                    } else {
                        resolve(model);
                    }
                })
                .catch((error) => {
                    reject(new HttpError('Bad request', HttpStatusCode.BadRequest));
                })
        });
    }
}
