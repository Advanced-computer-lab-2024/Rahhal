import  user , {IUser} from '../model/user-model';


//get specific user
export async function getUserByUsername(username : string) : Promise<IUser | null> {
    return await user.findOne({ userName : username });
};

//get all users
export async function getAllUsers () : Promise<IUser[] | null> {
    return await user.find();
};

//update user
export async function updateUserByUsername (username : string, updatedUser : IUser) : Promise<IUser | null> {
    return await user.findOneAndUpdate({ username : username }, updatedUser, { new : true });
};
