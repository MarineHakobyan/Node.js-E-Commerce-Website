import {Request} from "express";

export type TUserTokenDecoded = {
    userId: number,
    iat: number,
    exp:number
}

export type TRequestWithToken = Request & {
    user: TUserTokenDecoded
}
