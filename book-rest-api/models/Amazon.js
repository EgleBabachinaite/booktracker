"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amazon_product_api_1 = require("amazon-product-api");
var Amazon = /** @class */ (function () {
    function Amazon() {
    }
    Amazon.AutClient = function () {
        // returning amazon client
        return amazon_product_api_1.createClient({
            // Amazon autentification keys
            awsId: "AKIAI43ZL7KTJDNCCIWA",
            awsSecret: "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",
            awsTag: "intjvision-20"
        });
    };
    return Amazon;
}());
exports.Amazon = Amazon;
