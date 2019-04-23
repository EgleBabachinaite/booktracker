import {HttpRoute} from "./HttpRoute";
import {Express, Request, Response} from "express";
import {HttpError, HttpStatusCode} from "./HttpError";
import {Utility} from "../models/Utility";
import {User} from "../models/User";
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';

export class LoginRoute extends HttpRoute {
    setup(express: Express): void {
        express.post(`${this.path}`, this.loginUser.bind(this));
    }

    private loginUser(request: Request, response: Response): void {
        if (!request.body.password || request.body.password.length < 4) {
            response.status(HttpStatusCode.BadRequest);
            response.send(new HttpError('Bad password format', HttpStatusCode.BadRequest));
            return;
        }

        if (!Utility.ValidateEmail(request.body.email)) {
            response.status(HttpStatusCode.BadRequest);
            response.send(new HttpError('Invalid email', HttpStatusCode.BadRequest));
            return;
        }

        User.GetUserByEmail(request.body.email)
            .then((users: any[]) => {
                if (users.length === 0) {
                    response.status(HttpStatusCode.NotFound);
                    response.send(new HttpError('Invalid details', HttpStatusCode.Unauthorized));
                } else {
                    let user = users[0];

                    bcrypt.compare(request.body.password, user.password, (err, success) => {
                        if (success) {
                            // User logged in
                            let tokenPayload = {
                                userId: user.id
                            };

                            user.token = jwt.sign(tokenPayload, Utility.JWTKey);

                            delete user.password;
                            response.send(user);
                        } else {
                            response.status(HttpStatusCode.Unauthorized);
                            response.send(new HttpError('Invalid details', HttpStatusCode.Unauthorized));
                        }
                    });
                }
            })
            .catch((error: HttpError) => {
                console.log(error);
                response.status(error.code);
                response.send(error);
            });
    }
}
