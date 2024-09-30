import User from '../model/user-model';

// This file is responsible for handling the database operations.

const createUser = async (userData: JSON) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const deleteUser = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
};

export default { createUser, deleteUser };
