"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var BooksRoute_1 = require("./BooksRoute");
var UserRoute_1 = require("./UserRoute");
var LoginRoute_1 = require("./LoginRoute");
var AmazonRoute_1 = require("./AmazonRoute");
var HttpServer = /** @class */ (function () {
    function HttpServer(port) {
        this.express = express();
        var bodyParser = require('body-parser');
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.setupRoutes();
        this.express.listen(port, function () {
            console.log("Server is running on port " + port);
        });
    }
    HttpServer.prototype.setupRoutes = function () {
        new BooksRoute_1.BooksRoute('/book', this.express);
        new UserRoute_1.UserRoute('/user', this.express);
        new LoginRoute_1.LoginRoute('/login', this.express);
        new AmazonRoute_1.AmazonRoute('/amazon', this.express);
    };
    return HttpServer;
}());
exports.HttpServer = HttpServer;
