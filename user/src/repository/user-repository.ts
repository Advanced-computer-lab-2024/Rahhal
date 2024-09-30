import  user , {IUser} from '../model/user-model';


//get specific user
export async function getUserByUsername(
  username: string,
): Promise<IUser | null> {
  return await User.findOne({ username: username });
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
  return await User.findOne({ email: email });
}

export async function getUserById(userId: string): Promise<IUser | null> {
  return await User.findById(userId);
}

//get all users
export async function getAllUsers () : Promise<IUser[] | null> {
    return await user.find();
};

//update user
export async function updateUserByUsername(
  username: string,
  updatedUser: IUser,
): Promise<IUser | null> {
  return await User.findOneAndUpdate({ username: username }, updatedUser, {
    new: true,runValidators: true
  });
}

//update user by id
export async function updateUserById(
  userId: string,
  updatedUser: IUser,
): Promise<IUser | null> {
  return await User.findByIdAndUpdate(userId, updatedUser, { new: true , runValidators: true });
}

export async function createUser(userData: IUser) {
  const newUser = new User(userData);
  return await newUser.save();
}

export async function deleteUser(userId: string) {
  return await User.findByIdAndDelete(userId);
}
