import type { TRating } from "@/types";
import type { IUser } from "../models/User";
import User from "../models/User";

//get specific user
export async function getUserByUsername(username: string): Promise<IUser | null> {
  return await User.findOne({ username: username , deleted:false });
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
  return await User.findOne({ email: email , deleted:false });
}

export async function getUserById(userId: string): Promise<IUser | null> {
  return await User.findById(userId,{deleted:false});
}

//get all users or filter them based on given parameters
export async function getAllUsers(approved?: boolean): Promise<IUser[] | null> {
  return await User.find(approved !== undefined ? { approved: approved , deleted:false} : {});
}

//update user
export async function updateUserByUsername(
  username: string,
  updatedUser: IUser,
): Promise<IUser | null> {
  return await User.findOneAndUpdate({ username: username }, updatedUser, {
    new: true,
    runValidators: true,
  });
}

//update user by id
export async function updateUserById(userId: string, updatedUser: IUser): Promise<IUser | null> {
  return await User.findByIdAndUpdate(userId, updatedUser, { new: true, runValidators: true });
}

export async function createUser(userData: IUser) {
  const newUser = new User(userData);
  return await newUser.save();
}

export async function deleteUser(userId: string) {
  return await User.findByIdAndUpdate(userId , {deleted: true}, {new: true});
}

export async function addRating(userRating: TRating, ratedUserId: string) {
  return await User.findByIdAndUpdate(
    ratedUserId,
    { $push: { ratings: userRating } },
    { new: true },
  );
}
