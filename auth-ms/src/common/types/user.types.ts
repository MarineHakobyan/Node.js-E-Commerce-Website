import { User } from '../../models/userModel';
import {Request} from "express";

export type TUser = Omit<
  User,
  'password' | 'hashPasswordBeforeInsert' | 'validatePassword'
>;

export type TIdString = { id: string };

export type TUserTokenDecoded = {
    userId: number,
    iat: number,
    exp:number
}

export type TRequestWithToken = Request & {
    user: TUserTokenDecoded
}