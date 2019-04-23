"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HttpRoute_1 = require("./HttpRoute");
var User_1 = require("../models/User");
var HttpError_1 = require("./HttpError");
var Utility_1 = require("../models/Utility");
var UserRoute = /** @class */ (function (_super) {
    __extends(UserRoute, _super);
    function UserRoute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRoute.prototype.setup = function (express) {
        express.post("" + this.path, this.addUser.bind(this));
    };
    UserRoute.prototype.addUser = function (request, response) {
        var newUser = new User_1.User();
        newUser.email = request.body.email;
        newUser.password = request.body.password;
        if (!Utility_1.Utility.ValidateEmail(newUser.email)) {
            response.status(HttpError_1.HttpStatusCode.BadRequest);
            response.send(new HttpError_1.HttpError('Invalid email', HttpError_1.HttpStatusCode.BadRequest));
            return;
        }
        if (!newUser.password || newUser.password.length < 4) {
            response.status(HttpError_1.HttpStatusCode.BadRequest);
            response.send(new HttpError_1.HttpError('Password is too short', HttpError_1.HttpStatusCode.BadRequest));
            return;
        }
        User_1.User.GetUserByEmail(newUser.email)
            .then(function (users) {
            if (users.length > 0) {
                response.status(HttpError_1.HttpStatusCode.Conflict);
                response.send(new HttpError_1.HttpError('User with this email already exists', HttpError_1.HttpStatusCode.Conflict));
            }
            else {
                User_1.User.AddUser(newUser)
                    .then(function () {
                    delete newUser.password;
                    response.status(HttpError_1.HttpStatusCode.Created);
                    response.send(newUser);
                })
                    .catch(function (err) {
                    response.status(err.code);
                    response.send(err);
                });
            }
        })
            .catch(function (error) {
            response.status(error.code);
            response.send(error);
        });
        newUser.password = User_1.User.EncryptPassword(newUser.password);
    };
    return UserRoute;
}(HttpRoute_1.HttpRoute));
exports.UserRoute = UserRoute;
