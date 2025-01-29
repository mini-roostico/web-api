import {ApiLimiterStorage} from "../utils/limiter_storage/limiter.storage";
import {NextFunction, Request, Response} from "express";
import {TooManyRequests} from "../errors/errors";

export interface ApiLimiterRule {
    [method:string]: {
        time: number;
        limit: number;
    }
}

export interface ApiLimiterEntry {
    [endpoint: string]: ApiLimiterRule;
}

/**
 * Return the base endpoint of an endpoint with params.
 * @param endpoint
 */
function getBaseEndpoint(endpoint: string): string {
    return endpoint.replace(/\/\d+/g, '');
}

/**
 * Return a middleware limiting requests of an endpoint based on some rule.
 * @param rules
 * @param storage
 */
export function apiLimiter(rules: ApiLimiterEntry, storage: ApiLimiterStorage) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const endpoint = getBaseEndpoint(req.path);
        const method = req.method;
        const rule = rules[endpoint];

        if (!rule || !rule[method]) {
            return next();
        }

        const clientId = `${method}/${endpoint}/${req.ip}`;
        const entries = await storage.increaseEntry(clientId);

        if (entries > rule[method].limit) {
            return next(new TooManyRequests("Api limit reached"));
        }

        await storage.setExpiration(clientId, rule[method].time);

        return next();
    }

}