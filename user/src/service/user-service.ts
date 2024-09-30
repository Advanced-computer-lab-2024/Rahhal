import userRepository from '../repository/user-repository';

// This file is responsible for handling the business logic.

const createUser = async (userData: JSON) => {
  // Business logic like validation could be added here
  return await userRepository.createUser(userData);
};
const deleteUser = async (userId: string) => {
  return await userRepository.deleteUser(userId);
};


export default { createUser, deleteUser };
