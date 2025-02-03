import express from "express"
import bodyParser from "body-parser"
import {defaultErrorHandler, defaultResponseHandler, JwtHandler} from "common";
import {resolve} from "path";
import {createServer, Server} from "node:http";
import MongooseConfig from "./mongoose.config";
import userRouter from "../routes/user.route";
import sourceRoute from "../routes/source.route";

const ServerConfig = (): Server => {
    JwtHandler.config({
        ATPrivateKeyPath: resolve("./secrets/at_private.pem"), // TODO Adjust to test secret path
        RTPrivateKeyPath: resolve("./secrets/rt_private.pem") // Adjust to test secret path
    });

    MongooseConfig();

    const app = express();
    const httpServer = createServer(app);

    // Express configurations
    app.use(express.json());
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    });

    app.use("/users", userRouter);
    app.use("/sources", sourceRoute);

    app.use(defaultResponseHandler);
    app.use(defaultErrorHandler);

    return httpServer;
}

export default ServerConfig
