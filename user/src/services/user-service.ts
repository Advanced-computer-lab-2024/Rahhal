import * as userRepository from "../database/repositories/user-repository";
import { type IUser } from "../database/models/User";
import { bookingType } from "@/utils/constants";
import type { TRating } from "@/types";
import { Role } from "@/utils/constants";
import { ObjectId } from "mongodb";
import { bookingStatus, POINTS, LEVELS } from "@/utils/constants";
import { hasBookings, deleteEntities, deactivateEntities } from "@/services/booking-calls";
import publishNotification from "@/publishers/notification-publisher";

export async function createUser(userData: IUser) {
  return await userRepository.createUser(userData);
}

export async function deleteUser(userId: string) {
  const user = await userRepository.getUser({ _id: new ObjectId(userId) });
  if (!user) {
    throw new Error("User not found");
  }

  if (user.role === Role.tourGuide || user.role === Role.advertiser) {
    const filter = {
      owner: userId,
      type: user.role === Role.tourGuide ? bookingType.Itinerary : bookingType.Activity,
      status: bookingStatus.Upcoming,
    };
    if (await hasBookings(filter)) {
      let errorMessage = "";
      switch (user.role) {
        case Role.tourGuide:
          errorMessage =
            "You have upcoming itineraries that have bookings, Itenraries will be deactivated";
          break;
        case Role.advertiser:
          errorMessage =
            "You have upcoming activities that have bookings, Activities will be deactivated";
          break;
      }
      deactivateEntities({ owner: userId, role: user.role });
      throw new Error(errorMessage);
    }
  }
  if (user.role !== Role.tourist && user.role !== Role.tourismGovernor && user.role !== Role.admin)
    deleteEntities({ owner: userId, role: user.role });
  return await userRepository.deleteUser(userId);
}

export async function getAllUsers(filter: Partial<IUser>) {
  return await userRepository.getAllUsers(filter);
}

export async function getUser(filter: Partial<IUser>): Promise<IUser | null> {
  return await userRepository.getUser(filter);
}

export async function updateUser(userId: string, updatedUser: IUser): Promise<IUser | null> {
  const user = await userRepository.getUser({ _id: new ObjectId(userId) });
  if(user?.approved === false && updatedUser.approved === true) {
    sendApprovalNotification(userId);
  }
  return await userRepository.updateUser(userId, updatedUser);
}

export async function addRating(userRating: TRating, ratedUserId: string) {
  return await userRepository.addRating(userRating, ratedUserId);
}

export async function redeemPoints(user: IUser) {
  const updatedUser = user;
  const avgBalance = (user.points as number) / POINTS.MINPOINTS;
  updatedUser.points = (user.points as number) % POINTS.MINPOINTS;
  updatedUser.balance =
    (user.balance as number) + Math.floor(avgBalance) * POINTS.AMOUNTFORMINPOINTS;
  const newUser = await userRepository.updateUser(user._id.toString(), updatedUser);
  return newUser;
}

export function updatePointsAndLevel(user: IUser, amountPaid: number) {
  const updatedUser: Partial<IUser> = {
    points: user.points,
    accumulativePoints: user.accumulativePoints,
    level: user.level,
  };
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

export async function getNumberOfUsers(startDate?: Date, endDate?: Date) {
  return await userRepository.getNumberOfUsers(startDate, endDate);
}

export async function sendApprovalNotification(id: string) {
  const data = {
    userId: id,
    message: "Welcome to Rahhal Family, Your account has been approved",
  };

  publishNotification(data);
}
