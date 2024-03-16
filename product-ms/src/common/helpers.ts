import { Request, Response, NextFunction } from 'express';
import { ObjectLiteral } from 'typeorm';
import { DTOData } from './types/product.types';

export const handleAsync =
  (fn: Function) =>
  (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return fn(req, res, next).catch(next);
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
