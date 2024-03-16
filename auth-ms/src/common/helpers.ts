import { Request, Response, NextFunction } from 'express';
import {DTOData} from "./types/user.types";
import {ObjectLiteral} from "typeorm";

export const handleAsync =
  (fn: Function) =>
  (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };


const transformToDTO = <T extends ObjectLiteral, U extends ObjectLiteral>(
    dtoClass: new () => T,
    rawResponse: U,
): T => {
    const dto = new dtoClass();
    Object.assign(dto, rawResponse);

    return dto;
};

export const transformResponseBody = <
    T extends ObjectLiteral,
    U extends ObjectLiteral,
>(
    dtoClass: new () => T,
    rawResponse: U | U[],
): DTOData<T> => {
    if (!Array.isArray(rawResponse)) {
        return { data: transformToDTO(dtoClass, rawResponse) };
    }

    const data = rawResponse.map((item: U) => {
        return transformToDTO(dtoClass, item);
    });

    return { data };
};
