import { User } from '../models/userModel';

export type TUser = Omit<
  User,
  'password' | 'hashPasswordBeforeInsert' | 'validatePassword'
>;

export type TIdString = { id: string };
