import {Request} from "express";
import {ProductEntity} from "../../orm/entities/product.entity";
import {TRequestWithToken} from "./user.types";

export type TIdString = { id: string };

export type TReqWithProduct =  Request & {
    productId: number,
    params: TIdString
}

export type TReqWithProductPayload = TReqWithProductId & {
    userId: number;
    payload: Omit<ProductEntity, 'id'>
}

export type TReqWithProductId = TRequestWithToken & {
    productId: number;
}