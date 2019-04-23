"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var Database = /** @class */ (function () {
    function Database() {
        this.connect();
    }
    Database_1 = Database;
    Object.defineProperty(Database, "instance", {
        get: function () {
            if (!Database_1._instance)
                Database_1._instance = new Database_1();
            return Database_1._instance;
        },
        enumerable: true,
        configurable: true
    });
    Database.prototype.connect = function () {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        this.connection.connect(function (err) {
            if (err) {
                console.log('Cannot connect to DB');
                console.log(err.message);
            }
            else {
                console.log('Connected to DB');
            }
        });
    };
    Database.prototype.addBook = function (book) {
        if (!this.connection) {
            console.log('Server is not connected to DB');
            return;
        }
        var sql = "INSERT INTO books(id, title, author, page) VALUES(" + book.id + ",'" + book.title + "', '" + book.author + "', " + book.page + ")";
        this.connection.query(sql, function (err, results) {
            if (err) {
                console.log('Error adding book to DB');
            }
            else {
                console.log('Book added to DB');
            }
        });
    };
    var Database_1;
    __decorate([
        myMethodDecorator()
    ], Database.prototype, "connect", null);
    __decorate([
        myMethodDecorator()
    ], Database.prototype, "addBook", null);
    Database = Database_1 = __decorate([
        myClassDecorator()
    ], Database);
    return Database;
}());
exports.Database = Database;
function myClassDecorator() {
    return function (target) {
        console.log(target);
    };
}
exports.myClassDecorator = myClassDecorator;
function myMethodDecorator() {
    return function (target, propertyKey) {
        console.log("Metodas iskviestas " + propertyKey);
    };
}
