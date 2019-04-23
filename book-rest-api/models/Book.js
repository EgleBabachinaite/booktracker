"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var class_validator_1 = require("class-validator");
var Database_1 = require("../Database");
var HttpError_1 = require("../http/HttpError");
var User_1 = require("./User");
var Book = /** @class */ (function () {
    function Book() {
    }
    Book.SaveBook = function (book) {
        return new Promise(function (resolve, reject) {
            console.log(book);
            var sql = "INSERT INTO books(id, title, author, page) VALUES (" + Number(book.id) + ", '" + book.title + "', '" + book.author + "', " + Number(book.page) + ")";
            Database_1.Database.instance.connection.query(sql, function (err) {
                if (err) {
                    console.log(err);
                    reject(new HttpError_1.HttpError('Unable to add new Book'));
                }
                else
                    resolve(book);
            });
        });
    };
    Book.GetBooks = function (userId) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT * FROM books AS book\n                            LEFT JOIN user_book_relation AS ubr ON ubr.bookId = book.id\n                            LEFT JOIN users AS user ON user.id = ubr.userId WHERE ubr.userId = " + userId + ";";
            Database_1.Database.instance.connection.query({ sql: sql, nestTables: '_' }, function (err, result) {
                if (err) {
                    reject(new HttpError_1.HttpError('Cannot get books'));
                }
                else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    };
    Book.AddUserBook = function (userId, bookId) {
        return new Promise(function (resolve, reject) {
            var sql = "INSERT INTO user_book_relation(userId, bookId) VALUES('" + userId + "', '" + bookId + "')";
            Database_1.Database.instance.connection.query(sql, function (err, result) {
                if (err) {
                    reject(new HttpError_1.HttpError('Cannot add user book'));
                }
                else {
                    resolve();
                }
            });
        });
    };
    Book.BookFromSQLResponse = function (sqlResult) {
        var books = new Map();
        for (var _i = 0, sqlResult_1 = sqlResult; _i < sqlResult_1.length; _i++) {
            var result = sqlResult_1[_i];
            if (books.has(result.book_id)) {
                var book = books.get(result.book_id);
                if (result.user_id) {
                    var user = new User_1.User();
                    user.id = result.user_id;
                    user.email = result.user_email;
                    book.users.push(user);
                    books.set(book.id, book);
                }
            }
            else {
                var book = new Book();
                book.title = result.book_title;
                book.author = result.book_author;
                book.page = result.book_page;
                book.id = result.book_id;
                book.users = [];
                if (result.user_id) {
                    var user = new User_1.User();
                    user.id = result.user_id;
                    user.email = result.user_email;
                    book.users.push(user);
                }
                books.set(book.id, book);
            }
        }
        return Array.from(books.values());
    };
    Book.GetBookUsers = function (bookId) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT user.email, user.id FROM users AS user\n            JOIN user_book_relation AS ubr ON user.id = ubr.userId \n            WHERE ubr.bookId = " + bookId;
            Database_1.Database.instance.connection.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(new HttpError_1.HttpError('Cannot get users for book'));
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    Book.DeleteBook = function (bookId) {
        return new Promise(function (resolve, reject) {
            console.log(bookId);
            var sql = "DELETE FROM books WHERE id = " + bookId;
            Database_1.Database.instance.connection.query(sql, function (err, result) {
                if (err)
                    reject(new Error('Database error'));
                else
                    resolve(true);
            });
        });
    };
    Book.DeleteUserBook = function (bookId) {
        return new Promise(function (resolve, reject) {
            console.log(bookId);
            var sql = "DELETE FROM user_book_relation WHERE bookId = " + bookId;
            Database_1.Database.instance.connection.query(sql, function (err, result) {
                if (err)
                    reject(new Error('Database error'));
                else
                    resolve(true);
            });
        });
    };
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined()
    ], Book.prototype, "title", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined()
    ], Book.prototype, "author", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsDefined()
    ], Book.prototype, "page", void 0);
    return Book;
}());
exports.Book = Book;
