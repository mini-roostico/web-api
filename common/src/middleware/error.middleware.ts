import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/response/response";
import { StatusCodes } from "http-status-codes";
import { ErrorTypes } from "../errors/error.types";
import { HttpBaseError } from "../errors/errors";

export async function defaultErrorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const response: ErrorResponse = {
        success: false,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        error: {
            name: error.name,
            type: ErrorTypes.GENERIC_ERROR,
            message: error.message
        }
    }
    if (error instanceof HttpBaseError) {
        response.code = error.code;
        response.error.name = error.name;
        response.error.message = error.message;
        response.error.type = error.type;
    }

    res.status(response.code);
    return res.send(response);
}