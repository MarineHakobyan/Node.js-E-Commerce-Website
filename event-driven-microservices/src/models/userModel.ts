import { UserEntity } from '../orm/entities/userEntity';
import { findUserById } from '../services/authService';

export async function registerUser(data: any): Promise<UserEntity> {
    // Your registration logic here, e.g., create and save user to the database
    // Don't forget to call user.save() in your actual implementation
    const user = new UserEntity();
    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
    return user;
}

export async function loginUser(username: string, password: string): Promise<UserEntity | null> {
    // Your login logic here, e.g., find user by username in the database
    const user = await findUserById(username);

    if (user && await user.validatePassword(password)) {
        return user;
    }

    return null;
}