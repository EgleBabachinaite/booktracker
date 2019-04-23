import {HttpRoute} from "./HttpRoute";
import {Express, Request, Response} from "express";
import {createClient} from "amazon-product-api";
import {Amazon} from "../models/Amazon";

export class AmazonRoute extends HttpRoute {
    setup(express: Express): void {
        express.post(`${this.path}`, this.searchBooks.bind(this))
    }

    private searchBooks(request: Request, response: Response): void {
        let client = Amazon.AutClient();
        console.log(request.body);
        // Making request to amazon product api
        client.itemSearch({
            keywords: request.body.keyword,
            searchIndex: "Books",
        }).then(function(results){
            response.send(results);
        }).catch(function(err){
            console.log(err);
            response.send(err);
        });
    }
}
