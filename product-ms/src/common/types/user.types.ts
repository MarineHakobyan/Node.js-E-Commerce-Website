import {Request} from "express";
import {UserUpdateOptionalDataDto} from "../../dtos";
import {User} from "../../orm/entities/user.entity";

export type TUser = Omit<
  User,
  'password'
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
