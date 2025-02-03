import {Request, Response, NextFunction} from "express";
import {BadRequestError} from "../errors/errors";
import {Response as Resp} from "../utils/response/response";


export async function defaultResponseHandler(req: Request, res: Response, next: NextFunction) {
    const data = res.locals.data;
    const code = res.locals.code;

    if (data == undefined || code == undefined) {
        return next(new BadRequestError("Route doesn't exist"));
    }

    const response: Resp = {
        success: true,
        code: code,
        data: data,
    }

    res.status(code);
    return res.send(response);
}