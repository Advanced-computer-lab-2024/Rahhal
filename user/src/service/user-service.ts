import { IUser } from "../model/user-model";
import * as userRepository from "../repository/user-repository";


//get specific user by username
export async function getUserByUsername (username : string) : Promise<IUser | null> {
    return await userRepository.getUserByUsername(username);
};

//get all users
export async function getAllUsers() : Promise<IUser[] | null>{
    return await userRepository.getAllUsers();
};

//update user and searching for the user using it username
export async function updateUserByUsername (username : string, updatedUser : IUser) : Promise<IUser | null>{
    return await userRepository.updateUserByUsername(username, updatedUser);
};