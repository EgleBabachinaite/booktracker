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

        // The try{} statement allows you to define a block of code to be tested for errors while it is being executed.
        try {
            let decodedJson = jwt.verify(token, Utility.JWTKey);

            return decodedJson;
            //The catch{} statement allows you to define a block of code to be executed, if an error occurs in the try block.
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
                        console.log('model pasiektas');
                        resolve(model);
                    }
                })
                .catch((error) => {
                    reject(new HttpError('Bad request', HttpStatusCode.BadRequest));
                })
        });
    }
}
