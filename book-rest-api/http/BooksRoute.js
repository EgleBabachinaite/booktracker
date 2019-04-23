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
var Book_1 = require("../models/Book");
var HttpError_1 = require("./HttpError");
var Utility_1 = require("../models/Utility");
var User_1 = require("../models/User");
var BooksRoute = /** @class */ (function (_super) {
    __extends(BooksRoute, _super);
    function BooksRoute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BooksRoute.prototype.setup = function (express) {
        express.get("" + this.path, this.getBooks.bind(this));
        express.post("" + this.path, this.addBook.bind(this));
        express.delete(this.path + "/:bookId", this.deleteBook.bind(this));
    };
    BooksRoute.prototype.addBook = function (request, response) {
        var _this = this;
        console.log(request.body);
        User_1.User.ValidateToken(request)
            .then(function (user) {
            var book = request.body.book;
            _this.authUserId = request.body.userId;
            console.log(book);
            console.log(_this.authUserId);
            return Utility_1.Utility.ValidateModel(book);
        })
            .then(function (model) {
            console.log(model);
            return Book_1.Book.SaveBook(model);
        })
            .then(function (model) {
            return Book_1.Book.AddUserBook(_this.authUserId, model.id);
        })
            .then(function () {
            response.status(201);
            response.send({ status: 201 });
        })
            .catch(function (error) {
            console.log(error);
            response.status(error.code);
            response.send(error);
        });
    };
    BooksRoute.prototype.getBooks = function (request, response) {
        console.log("" + this.path);
        User_1.User.ValidateToken(request)
            .then(function (user) {
            return Book_1.Book.GetBooks(user.id);
        })
            .then(function (books) {
            var booksResponse = Book_1.Book.BookFromSQLResponse(books);
            console.log(booksResponse);
            response.send(booksResponse);
        })
            .catch(function (error) {
            response.status(error.code);
            response.send(error);
        });
    };
    BooksRoute.prototype.deleteBook = function (request, response) {
        var bookId = Number(request.params.bookId);
        console.log(bookId);
        if (bookId) {
            Book_1.Book.DeleteUserBook(bookId)
                .then(function () {
                return Book_1.Book.DeleteBook(bookId);
            })
                .then(function () {
                response.status(201);
                response.send({ status: 201 });
            })
                .catch(function (err) {
                response.send(new Error('Error deleting book'));
            });
        }
        else {
            response.send(new HttpError_1.HttpError('Bad request', HttpError_1.HttpStatusCode.BadRequest));
        }
    };
    return BooksRoute;
}(HttpRoute_1.HttpRoute));
exports.BooksRoute = BooksRoute;
