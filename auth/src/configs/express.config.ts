import {defaultErrorHandler, defaultResponseHandler, JwtHandler} from "common";
import {resolve} from "path";
import express, {Application} from "express";
import MongooseConfig from "./mongoose.config";
import bodyParser from "body-parser";


const ExpressConfig = (): Application => {
    JwtHandler.config({
        ATPrivateKeyPath: resolve("../.test_secret/at_private.pem"),
        RTPrivateKeyPath: resolve("../.test_secret/rt_private.pem"),
    });

    MongooseConfig();
    const app = express();

    // Express configurations
    app.use(express.json());
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    });

    // TODO: Add auth route

    app.use(defaultResponseHandler);
    app.use(defaultErrorHandler);

    return app;
}