import { User } from '../../models/userModel';
import {Request} from "express";
import {UserUpdateOptionalDataDto} from "../../dtos";

export type TUser = Omit<
  User,
  'password' | 'hashPasswordBeforeInsert' | 'validatePassword'
>;

export type TUserTokenDecoded = {
    userId: number,
    iat: number,
    exp:number
}

export type TRequestWithToken = Request & {
    user: TUserTokenDecoded
}

export type TUpdateUserRequest = UserUpdateOptionalDataDto & TRequestWithToken

export type TIdString = { id: string };

export type TReqWithProductId = Request & { userId?: number; params?: TIdString } & { productId: number }