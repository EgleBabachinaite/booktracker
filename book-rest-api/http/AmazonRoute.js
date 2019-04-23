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
var Amazon_1 = require("../models/Amazon");
var AmazonRoute = /** @class */ (function (_super) {
    __extends(AmazonRoute, _super);
    function AmazonRoute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmazonRoute.prototype.setup = function (express) {
        express.post("" + this.path, this.searchBooks.bind(this));
    };
    AmazonRoute.prototype.searchBooks = function (request, response) {
        var client = Amazon_1.Amazon.AutClient();
        console.log(request.body);
        // Making request to amazon product api
        client.itemSearch({
            keywords: request.body.keyword,
            searchIndex: "Books",
        }).then(function (results) {
            response.send(results);
        }).catch(function (err) {
            console.log(err);
            response.send(err);
        });
    };
    return AmazonRoute;
}(HttpRoute_1.HttpRoute));
exports.AmazonRoute = AmazonRoute;
