import {Request} from "express";
import {ProductEntity} from "../../orm/entities/product.entity";

export type TIdString = { id: string };

export type TReqWithProductId =  Request & {
    productId: number,
    params: TIdString
}

export type TReqWithProductPayload = TReqWithProductId & {
    userId: number;
    payload: Omit<ProductEntity, 'id'>
}