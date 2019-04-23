"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("../Database");
var HttpError_1 = require("../http/HttpError");
var bcrypt = require("bcrypt-nodejs");
var Utility_1 = require("./Utility");
var User = /** @class */ (function () {
    function User() {
    }
    User.AddUser = function (user) {
        return new Promise(function (resolve, reject) {
            var sql = "INSERT INTO users(email, password) VALUES ('" + user.email + "', '" + user.password + "')";
            Database_1.Database.instance.connection.query(sql, function (err) {
                if (err) {
                    reject(new HttpError_1.HttpError(err.code));
                }
                else {
                    resolve();
                }
            });
        });
    };
    User.EncryptPassword = function (password) {
        return bcrypt.hashSync(password);
    };
    User.GetUserByEmail = function (email) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT * FROM users WHERE email='" + email + "'";
            Database_1.Database.instance.connection.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(new HttpError_1.HttpError('DB Error'));
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    User.GetUserById = function (id) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT * FROM users WHERE id='" + id + "'";
            Database_1.Database.instance.connection.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(new HttpError_1.HttpError('DB Error'));
                }
                else {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject(new HttpError_1.HttpError('User not found', HttpError_1.HttpStatusCode.NotFound));
                }
            });
        });
    };
    User.ValidateToken = function (request) {
        return new Promise(function (resolve, reject) {
            console.log(request.headers.authorization);
            var token = request.headers.authorization;
            if (!token) {
                throw new HttpError_1.HttpError('Token is not provided', HttpError_1.HttpStatusCode.BadRequest);
            }
            // Extracting JWT token
            token = token.split(' ')[1];
            // Verifying JWT token
            var decoded = Utility_1.Utility.VerifyToken(token);
            if (!decoded) {
                throw new HttpError_1.HttpError('Token is not valid', HttpError_1.HttpStatusCode.Unauthorized);
            }
            else {
                User.GetUserById(decoded.userId)
                    .then(function (users) {
                    resolve(users[0]);
                })
                    .catch(function () {
                    reject(new HttpError_1.HttpError('User not found', HttpError_1.HttpStatusCode.NotFound));
                });
            }
        });
    };
    return User;
}());
exports.User = User;
