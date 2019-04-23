import {HttpServer} from "./http/HttpServer";
import "reflect-metadata";
import * as dotenv from 'dotenv';

dotenv.config();

let httpServer = new HttpServer(Number(process.env.PORT));




