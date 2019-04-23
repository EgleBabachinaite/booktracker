"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var class_validator_1 = require("class-validator");
var HttpError_1 = require("../http/HttpError");
var Utility = /** @class */ (function () {
    function Utility() {
    }
    Utility.ValidateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    Utility.VerifyToken = function (token) {
        try {
            var decodedJson = jwt.verify(token, Utility.JWTKey);
            return decodedJson;
        }
        catch (_a) {
            return false;
        }
    };
    Utility.ValidateModel = function (model) {
        return new Promise(function (resolve, reject) {
            class_validator_1.validate(model)
                .then(function (errors) {
                if (errors.length > 0) {
                    console.log(errors);
                    reject(new HttpError_1.HttpError("Property " + errors[0].property + " is invalid", HttpError_1.HttpStatusCode.BadRequest));
                }
                else {
                    resolve(model);
                }
            })
                .catch(function (error) {
                reject(new HttpError_1.HttpError('Bad request', HttpError_1.HttpStatusCode.BadRequest));
            });
        });
    };
    Utility.JWTKey = 'ewzrxtcfygvhbjkn12375%^$';
    return Utility;
}());
exports.Utility = Utility;
