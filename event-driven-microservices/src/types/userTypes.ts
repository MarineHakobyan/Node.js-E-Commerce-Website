import {UserEntity} from "../models/userModel";

export type TUser = Omit<UserEntity, 'password'| 'hashPasswordBeforeInsert'| 'validatePassword'>