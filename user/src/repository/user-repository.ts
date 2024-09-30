import User, { IUser } from "../model/user-model";
// This file is responsible for handling the database operations.

//get specific user
export async function getUserByUsername(
  username: string,
): Promise<IUser | null> {
  return await User.findOne({ username: username });
}

//get all users
export async function getAllUsers(): Promise<IUser[] | null> {
  return await User.find();
}

//update user
export async function updateUserByUsername(
  username: string,
  updatedUser: IUser,
): Promise<IUser | null> {
  return await User.findOneAndUpdate({ username: username }, updatedUser, {
    new: true,
  });
}

export async function createUser(userData: JSON) {
  const newUser = new User(userData);
  return await newUser.save();
}

export async function deleteUser(userId: string) {
  return await User.findByIdAndDelete(userId);
}
