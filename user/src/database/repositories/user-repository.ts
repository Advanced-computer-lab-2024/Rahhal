import type { TRating } from "@/types";
import type { IUser } from "../models/User";
import User from "../models/User";

export async function getAllUsers(filter: Partial<IUser>) {
  return await User.find({deleted: false , ...filter});
}

export async function getUser(filter: Partial<IUser>){
  return await User.findOne({deleted: false , ...filter});
}

export async function updateUser(userId: string, updatedUser: IUser): Promise<IUser | null> {
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
