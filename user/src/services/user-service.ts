import * as userRepository from "../database/repositories/user-repository";
import { type IUser } from "../database/models/User";
import type { TRating } from "@/types";

export async function createUser(userData: IUser) {
  return await userRepository.createUser(userData);
}

//check if the user already exists
export async function deleteUser(userId: string) {
  return await userRepository.deleteUser(userId);
}

//get specific user by username
export async function getUserByUsername(username: string): Promise<IUser | null> {
  return await userRepository.getUserByUsername(username);
}

//get specific user by id
export async function getUserById(userId: string): Promise<IUser | null> {
  return await userRepository.getUserById(userId);
}

//get specific user by email
export async function getUserByEmail(email: string): Promise<IUser | null> {
  return await userRepository.getUserByEmail(email);
}

//get all users
export async function getAllUsers(approved?: boolean): Promise<IUser[] | null> {
  return await userRepository.getAllUsers(approved);
}

//update user and searching for the user using it username
export async function updateUserByUsername(
  username: string,
  updatedUser: IUser,
): Promise<IUser | null> {
  return await userRepository.updateUserByUsername(username, updatedUser);
}

//update user and searching for the user using it id
export async function updateUserById(userId: string, updatedUser: IUser): Promise<IUser | null> {
  return await userRepository.updateUserById(userId, updatedUser);
}

export async function addRating(userRating: TRating, ratedUserId: string) {
  return await userRepository.addRating(userRating, ratedUserId);
}
