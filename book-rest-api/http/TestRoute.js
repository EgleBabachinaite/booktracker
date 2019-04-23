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
var TestRoute = /** @class */ (function (_super) {
    __extends(TestRoute, _super);
    function TestRoute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestRoute.prototype.setup = function (express) {
        express.get("" + this.path, this.getTest.bind(this));
        express.post("" + this.path, this.postTest.bind(this));
    };
    TestRoute.prototype.getTest = function (request, response) {
        response.send('TEST ROUTE WORKS');
    };
    TestRoute.prototype.postTest = function (request, response) {
        response.send('POST TEST ROUTE WORKS');
    };
    return TestRoute;
}(HttpRoute_1.HttpRoute));
exports.TestRoute = TestRoute;
