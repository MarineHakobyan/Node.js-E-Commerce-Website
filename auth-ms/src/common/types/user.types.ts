import {Request} from "express";
import {UserUpdateOptionalDataDto} from "../../dtos";

export type TUserId = {
    userId: number,
}

export type TReqWithUserId = Request & TUserId

export type TUserTokenDecoded = {
    userId: number,
    iat: number,
    exp:number
}

export type TRequestWithToken = Request & {
    user: TUserTokenDecoded
}

export type TRequestWithUserId = Request & TUserId

export type TUpdateUserRequest = UserUpdateOptionalDataDto & TRequestWithToken

export type DTOData<T> = { data: T | T[] };
