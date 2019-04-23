import {MysqlError} from "mysql";
import {Database} from "../Database";
import {HttpError, HttpStatusCode} from "../http/HttpError";
import * as bcrypt from 'bcrypt-nodejs';
import {Request} from "express";
import {Utility} from "./Utility";
import {STATUS_CODES} from "http";

export class User {
    id: number;
    email: string;
    password: string;
    date: string;

    public static AddUser(user: User): Promise<MysqlError | undefined> {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO users(email, password) VALUES ('${user.email}', '${user.password}')`;
            Database.instance.connection.query(sql, (err: MysqlError) => {
                if (err) {
                    reject(new HttpError(err.code));
                } else {
                    resolve();
                }
            });
        });
    }

    public static EncryptPassword(password: string): string {
        return bcrypt.hashSync(password);
    }

    public static GetUserByEmail(email: string): Promise<HttpError | any[]> {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE email='${email}'`;
            Database.instance.connection.query(sql, (err: MysqlError, result: any[]) => {
                if (err) {
                    console.log(err);
                    reject(new HttpError('DB Error'));
                } else {
                    resolve(result);
                }
            });
        });
    }

    public static GetUserById(id: number): Promise<HttpError | any[]> {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE id='${id}'`;
            Database.instance.connection.query(sql, (err: MysqlError, result: any[]) => {
                if (err) {
                    console.log(err);
                    reject(new HttpError('DB Error'));
                } else {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject(new HttpError('User not found', HttpStatusCode.NotFound));
                }
            });
        });
    }

    public static ValidateToken(request: Request): Promise<User | HttpError> {
        return new Promise((resolve, reject) => {
            console.log(request.headers.authorization);
            let token = request.headers.authorization;
            if (!token) {
                throw new HttpError('Token is not provided', HttpStatusCode.BadRequest);
            }
            // Extracting JWT token
            token = token.split(' ')[1];
            // Verifying JWT token
            let decoded = Utility.VerifyToken(token);
            if (!decoded) {
                throw new HttpError('Token is not valid', HttpStatusCode.Unauthorized);
            } else {
                User.GetUserById(decoded.userId)
                    .then((users: any[]) => {
                        resolve(users[0]);
                    })
                    .catch(() => {
                        reject(new HttpError('User not found', HttpStatusCode.NotFound));
                    });
            }
        });
    }
}
