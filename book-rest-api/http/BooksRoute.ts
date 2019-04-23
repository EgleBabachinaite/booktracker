import {HttpRoute} from "./HttpRoute";
import {Express, Request, Response} from "express";
import {Book} from "../models/Book";
import {HttpError, HttpStatusCode} from "./HttpError";
import {Utility} from "../models/Utility";
import {User} from "../models/User";

export class BooksRoute extends HttpRoute {
    protected path: string;
    protected authUserId: number;

    setup(express: Express): void {
        express.get(`${this.path}`, this.getBooks.bind(this));
        express.post(`${this.path}`, this.addBook.bind(this));
        express.delete(`${this.path}/:bookId`, this.deleteBook.bind(this));
    }

    private addBook(request: Request, response: Response): void {
        console.log(request.body);
        User.ValidateToken(request)
            .then((user: User) => {
                let book = request.body.book;
                this.authUserId = request.body.userId;
                console.log(book);
                console.log(this.authUserId);
                return Utility.ValidateModel(book);
            })
            .then((model: Book) => {
                console.log(model);
                return Book.SaveBook(model);
            })
            .then((model: Book) => {
                return Book.AddUserBook(this.authUserId, model.id);
            })
            .then( () => {
                response.status(201);
                response.send({status: 201});
            })
            .catch((error: HttpError) => {
                console.log(error);
                response.status(error.code);
                response.send(error);
            });
    }

    private getBooks(request: Request, response: Response): void {
        console.log(`${this.path}`);
        User.ValidateToken(request)
            .then((user: User) => {
                return Book.GetBooks(user.id);
            })
            .then((books: Book[]) => {
                let booksResponse = Book.BookFromSQLResponse(books);
                console.log(booksResponse);
                response.send(booksResponse);
            })
            .catch((error: HttpError) => {
                response.status(error.code);
                response.send(error);
            })
    }

    private deleteBook(request: Request, response: Response): void {
        let bookId = Number(request.params.bookId);
        console.log(bookId);
        if (bookId) {
            Book.DeleteUserBook(bookId)
                .then(() => {
                    return Book.DeleteBook(bookId);
                })
                .then(() => {
                    response.status(201);
                    response.send({status: 201});
                })
                .catch((err: HttpError) => {
                    response.send(new Error('Error deleting book'));
                });
        } else {
            response.send(new HttpError('Bad request', HttpStatusCode.BadRequest));
        }
    }
}
