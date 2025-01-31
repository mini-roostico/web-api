import {Router} from "express";
import RedisLimiterStorage from "../configs/redis.config";
import {apiLimiter, ApiLimiterEntry, authenticationHandler} from "common";
import {getSources, submitSource} from "../controllers/sources";

const sourceRoute = Router();

const API_LIMITER_RULES: ApiLimiterEntry = {
    "/": {
        "GET": {
            time: 20,
            limit: 100
        },
        "POST": {
            time: 10,
            limit: 100
        }
    },
};

const limitStorage = new RedisLimiterStorage();

sourceRoute.use(apiLimiter(API_LIMITER_RULES, limitStorage));

sourceRoute.get(
    "/",
    authenticationHandler,
    getSources
);

sourceRoute.post(
    "/",
    authenticationHandler,
    submitSource
);

export default sourceRoute;