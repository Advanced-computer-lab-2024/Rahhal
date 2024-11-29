import Authentication from "@/database/models/Authentication";
import type { IAuthentication } from "@/database/models/Authentication";


export async function getUser(user:Partial<IAuthentication>){
    return await Authentication.findOne(user);
};

export async function getUserById(id:string){
    return await Authentication.findById(id);
};

export async function createUser(userData : IAuthentication) {
    const newUser = new Authentication(userData);
    return await newUser.save();
};

export async function updateUser(userId : string , field: Partial<IAuthentication>){
    return await Authentication.findByIdAndUpdate(userId , field);
};

export async function deleteUser(userId : string){
    return await Authentication.findByIdAndDelete(userId);
}