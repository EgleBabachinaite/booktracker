import {HttpRoute} from "./HttpRoute";
import {Express, Request, Response} from "express";

export class TestRoute extends HttpRoute {
    setup(express: Express): void {
        express.get(`${this.path}`, this.getTest.bind(this));
        express.post(`${this.path}`, this.postTest.bind(this));
    }

    private getTest(request: Request, response: Response): void {
        response.send('TEST ROUTE WORKS');
    }

    private postTest(request: Request, response: Response): void {
        response.send('POST TEST ROUTE WORKS');
    }
}
