import * as userRepository from "../database/repositories/user-repository";
import {type IUser } from "../database/models/User";
import { bookingType } from "@/utils/constants";
import type { TRating } from "@/types";
import { Role } from "@/utils/constants";
import  { bookingStatus , POINTS , LEVELS} from "@/utils/constants";
import { hasBookings , deleteEntities } from "@/services/booking-calls";


export async function createUser(userData: IUser) {
  return await userRepository.createUser(userData);
}

//check if the user already exists
export async function deleteUser(userId: string) {
  const user = await userRepository.getUserById(userId);
  if(!user){
    throw new Error("User not found");
  }

  if(user.role === Role.tourGuide || user.role === Role.advertiser){
    const filter ={
      owner: userId,
      type: user.role === Role.tourGuide ? bookingType.Itinerary : bookingType.Activity,
      status: bookingStatus.Upcoming
    }
    if(await hasBookings(filter)){
      let errorMessage = "";
      switch(user.role){
        case Role.tourGuide:
          errorMessage = "Tour guide has upcoming itineraries that have bookings";
          break;
        case Role.advertiser:
          errorMessage = "Advertiser has upcoming activities that have bookings";
          break;
      }
      throw new Error(errorMessage);
    }
  }
  if(user.role !== Role.tourist && user.role !== Role.tourismGovernor && user.role !== Role.admin)
    deleteEntities({owner: userId , role: user.role});
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

export async function redeemPoints(user:IUser){
  const updatedUser = user;
  const avgBalance = user.points as number / POINTS.MINPOINTS;
  updatedUser.points = user.points as number % POINTS.MINPOINTS;
  updatedUser.balance =
    (user.balance as number) + Math.floor(avgBalance) * POINTS.AMOUNTFORMINPOINTS;
  const newUser = await userRepository.updateUserById(user._id.toString() , updatedUser);
  return newUser;
}

export function updatePointsAndLevel(user:IUser , amountPaid:number){
  const updatedUser:Partial<IUser> ={points:user.points,accumulativePoints:user.accumulativePoints,level:user.level};
  let userLevelPointRate = POINTS.LEVEL3POINTRATE;
  if (user.level === LEVELS.LEVEL1) {
    userLevelPointRate = POINTS.LEVEL1POINTRATE;
  } else if (user.level === LEVELS.LEVEL2) {
    userLevelPointRate = POINTS.LEVEL2POINTRATE;
  }
  updatedUser.points = Math.ceil((user.points as number) + amountPaid * userLevelPointRate);
  updatedUser.accumulativePoints = Math.ceil(
    (user.accumulativePoints as number) + amountPaid * userLevelPointRate,
  );

  if (updatedUser.accumulativePoints >= POINTS.LEVEL1MAXPOINTS) {
    updatedUser.level = LEVELS.LEVEL2;
  }
  if (updatedUser.accumulativePoints >= POINTS.LEVEL2MAXPOINTS) {
    updatedUser.level = LEVELS.LEVEL3;
  }
  return updatedUser;
}
