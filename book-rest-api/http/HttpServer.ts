import {Express} from "express";
import * as express from 'express';
import * as cors from 'cors';
import {BooksRoute} from "./BooksRoute"
import {TestRoute} from "./TestRoute";
import {UserRoute} from "./UserRoute";
import {LoginRoute} from "./LoginRoute";
import {AmazonRoute} from "./AmazonRoute";

export class HttpServer {
    private express: Express;

    constructor(port: number) {
        this.express = express();

        let bodyParser = require('body-parser');
        this.express.use(bodyParser.json());

        this.express.use(cors());

        this.setupRoutes();

        this.express.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }

    private setupRoutes(): void {
        new BooksRoute('/book', this.express);
        new UserRoute('/user', this.express);
        new LoginRoute('/login', this.express);
        new AmazonRoute('/amazon', this.express);
    }
}
