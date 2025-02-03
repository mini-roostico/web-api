"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
let redisClient;
const host = process.env.REDIS_HOST || "localhost";
const port = parseInt(process.env.REDIS_PORT) || 6379;
(() => __awaiter(void 0, void 0, void 0, function* () {
    redisClient = (0, redis_1.createClient)({
        socket: {
            host: host,
            port: port
        }
    });
    yield redisClient.connect();
}))();
class RedisLimiterStorage {
    exists(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield redisClient.exists(clientId);
            return exists === 1;
        });
    }
    increaseEntry(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redisClient.incr(clientId);
        });
    }
    setExpiration(clientId, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            return redisClient.expire(clientId, seconds);
        });
    }
}
exports.default = RedisLimiterStorage;
