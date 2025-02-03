import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors/errors";
import { ErrorTypes } from "../errors/error.types";
import { Jwt } from "../models/jwt/jwt";
import { User } from "../models/users/users";

export async function authenticationHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorization = req.headers.authorization;
    if (authorization == undefined) {
        return next(
            new BadRequestError(
                "Authorization header not found in the request",
                undefined,
                ErrorTypes.VALIDATION_ERROR)
        );
    }
    const accessToken = authorization.split(" ")[1];
    try {
        const jwtRecord = await Jwt.findOne({accessToken: accessToken});
        if (jwtRecord == null) {
            return next(
                new NotFoundError(
                    "Submitted jwt token doesn't exist",
                    undefined,
                    ErrorTypes.JWT_ERROR
                )
            );
        }
        const validationResponse = await jwtRecord.validateAccessToken();
        const user = await User.findOne({email: validationResponse.sub.email});
        if (user == null) {
            return next(
                new NotFoundError(
                    "User not found",
                    undefined,
                    ErrorTypes.VALIDATION_ERROR
                )
            );
        }
        res.locals.user = user;
    } catch (error) {
        return next(error);
    }
    next();
}