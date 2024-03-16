import {TReqWithUserId} from "../common/types/user.types";
import {NextFunction, Response} from "express";

export function parseUserIdParam(
    req: TReqWithUserId,
    res: Response,
    next: NextFunction,
) {
    const { id } = req.params;

    if (id && isNaN(Number(id))) {
        next(new Error('Invalid Product ID: Must be a number'));
    }

    req.userId = Number(id);
    next();
}