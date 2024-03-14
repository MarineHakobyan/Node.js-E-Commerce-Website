export class UserRegistrationDto {
  username: string;
  email: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export interface UpdatePasswordDto {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface UserUpdateOptionalDataDto {
  username?: string;
  email?: string;
}

export interface UserUpdateAllDataDto {
  username: string;
  email: string;
}
