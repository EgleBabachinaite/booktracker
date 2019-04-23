import "reflect-metadata";
import {IsDefined, IsNumber, IsString} from "class-validator";
import {Database} from "../Database";
import {Type} from "class-transformer";
import {MysqlError} from "mysql";
import {HttpError} from "../http/HttpError";
import {User} from "./User";

export class Book {
    id: number;

    @IsString()
    @IsDefined()
    title: string;

    @IsString()
    @IsDefined()
    author: string;

    @IsNumber()
    @IsDefined()
    page: number;

    users?: User[];

    public static SaveBook(book: Book): Promise<Book | HttpError> {
        return new Promise((resolve, reject) => {
            console.log(book);
            const sql = `INSERT INTO books(id, title, author, page) VALUES (${Number(book.id)}, '${book.title}', '${book.author}', ${Number(book.page)})`;

            Database.instance.connection.query(sql, (err: MysqlError) => {
                if (err) {
                    console.log(err);
                    reject(new HttpError('Unable to add new Book'));
                } else
                    resolve(book);
            });
        });
    }

    public static GetBooks(userId: number): Promise<Book[] | HttpError> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM books AS book
                            LEFT JOIN user_book_relation AS ubr ON ubr.bookId = book.id
                            LEFT JOIN users AS user ON user.id = ubr.userId WHERE ubr.userId = ${userId};`;
            Database.instance.connection.query({sql: sql, nestTables: '_'}, (err: MysqlError, result: any) => {
                if (err) {
                    reject(new HttpError('Cannot get books'));
                } else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    }

    public static AddUserBook(userId: number, bookId: number): Promise<HttpError | void> {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO user_book_relation(userId, bookId) VALUES('${userId}', '${bookId}')`;

            Database.instance.connection.query(sql, (err: MysqlError, result: any) => {
                if (err) {
                    reject(new HttpError('Cannot add user book'));
                } else {
                    resolve();
                }
            });
        });
    }

    public static BookFromSQLResponse(sqlResult: any[]): Book[] {
        let books = new Map();
        for (let result of sqlResult) {
            if (books.has(result.book_id)) {
                let book = books.get(result.book_id);
                if (result.user_id) {
                    let user = new User();
                    user.id = result.user_id;
                    user.email = result.user_email;
                    book.users.push(user);
                    books.set(book.id, book);
                }
            } else {
                let book = new Book();
                book.title = result.book_title;
                book.author = result.book_author;
                book.page = result.book_page;
                book.id = result.book_id;
                book.users = [];
                if (result.user_id) {
                    let user = new User();
                    user.id = result.user_id;
                    user.email = result.user_email;
                    book.users.push(user);
                }
                books.set(book.id, book);
            }
        }
        return Array.from(books.values());
    }

    public static GetBookUsers(bookId: number): Promise<HttpError | User[]> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT user.email, user.id FROM users AS user
            JOIN user_book_relation AS ubr ON user.id = ubr.userId 
            WHERE ubr.bookId = ${bookId}`;
            Database.instance.connection.query(sql, (err: MysqlError, result: any) => {
                if (err) {
                    console.log(err);
                    reject(new HttpError('Cannot get users for book'));
                } else {
                    resolve(result);
                }
            })
        })
    }

    public static DeleteBook(bookId: number): Promise<boolean | HttpError> {
        return new Promise((resolve, reject) => {
            console.log(bookId);
            let sql = `DELETE FROM books WHERE id = ${bookId}`;
            Database.instance.connection.query(sql, (err: MysqlError, result: any) => {
                if (err)
                    reject(new Error('Database error'));
                else
                    resolve(true);
            });
        });
    }

    public static DeleteUserBook(bookId: number): Promise<boolean | HttpError> {
        return new Promise((resolve, reject) => {
            console.log(bookId);
            const sql = `DELETE FROM user_book_relation WHERE bookId = ${bookId}`;

            Database.instance.connection.query(sql, (err: MysqlError, result: any) => {
                if (err)
                    reject(new Error('Database error'));
                else
                    resolve(true);
            });
        });
    }
}
