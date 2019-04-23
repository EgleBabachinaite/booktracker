import {Connection, MysqlError} from "mysql";
import * as mysql from "mysql";
import {Book} from "./models/Book";

@myClassDecorator()
export class Database {
    public connection: Connection;

    // Singleton pattern
    private static _instance: Database;

    static get instance(): Database {
        if (!Database._instance)
            Database._instance = new Database();
        return Database._instance;
    }

    constructor() {
        this.connect();
    }

    @myMethodDecorator()
    connect(): void {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        this.connection.connect((err: MysqlError | null) => {
            if (err) {
                console.log('Cannot connect to DB');
                console.log(err.message);
            } else {
                console.log('Connected to DB');
            }
        });
    }

    @myMethodDecorator()
    addBook(book: Book): void {
        if (!this.connection) {
            console.log('Server is not connected to DB');
            return;
        }
        let sql = `INSERT INTO books(id, title, author, page) VALUES(${book.id},'${book.title}', '${book.author}', ${book.page})`;

        this.connection.query(sql, (err: MysqlError | null, results: any) => {
            if (err) {
                console.log('Error adding book to DB');
            } else {
                console.log('Book added to DB');
            }
        });
    }
}

export function myClassDecorator() {
    return function (target: any) {
        console.log(target);
    }
}

function myMethodDecorator() {
    return function (target: any, propertyKey: string) {
        console.log(`Metodas iskviestas ${propertyKey}`);
    }
}


