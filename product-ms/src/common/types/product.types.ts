import {Product} from "../../orm/entities/product.entity";
import {TRequestWithToken} from "./user.types";

export type TReqWithProductId = TRequestWithToken & {
    productId: number;
}

export type TReqWithProductPayload =  {
    userId: number;
    payload: Omit<Product, 'id'>
}

export type TReqWithProductPayloadAndId = TReqWithProductId & TReqWithProductPayload