"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const mongoose_config_1 = __importDefault(require("./mongoose.config"));
const body_parser_1 = __importDefault(require("body-parser"));
const ExpressConfig = () => {
    common_1.JwtHandler.config({
        ATPrivateKeyPath: (0, path_1.resolve)("../secrets/at_private.pem"),
        RTPrivateKeyPath: (0, path_1.resolve)("../secrets/rt_private.pem"),
    });
    (0, mongoose_config_1.default)();
    const app = (0, express_1.default)();
    // Express configurations
    app.use(express_1.default.json());
    app.use(body_parser_1.default.json());
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    });
    // TODO: Add auth route
    app.use(common_1.defaultResponseHandler);
    app.use(common_1.defaultErrorHandler);
    return app;
};
