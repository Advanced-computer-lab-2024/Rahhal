import type { Request, Response } from "express";
import * as userService from "@/services/user-service";
import { STATUS_CODES } from "@/utils/constants";
import { z } from "zod";
import type { TRating , PopulatedBooking , IItinerary ,IActivity , IProduct } from "@/types";
import { POINTS , LEVELS , bookingType , MIN_LENGTH } from "@/utils/constants";
import { entertainmentAxiosInstance , gatewayAxiosInstance , productAxiosInstance } from "@/utils/axios-instances";


export async function getUserByUsername(req: Request, res: Response) {
  try {
    const username = req.body.username;
    const user = await userService.getUserByUsername(username);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(user);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
}

//get all users
export async function getAllUsers(req: Request, res: Response) {
  const queryParametersSchema = z.object({
    approved: z
      .enum(["true", "false"])
      // Convert the string to a boolean
      .transform((val) => val.toLocaleLowerCase() === "true")
      .optional(),
  });
  const validationResult = queryParametersSchema.safeParse(req.query);

  if (!validationResult.success) {
    res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({ error: validationResult.error });
    return;
  }

  const { approved } = validationResult.data;

  try {
    // If approved is not provided (== undefined), it will get all users
    const users = await userService.getAllUsers(approved);
    if (!users) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "No users found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(users);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
}

//getUserById
export async function getUserById(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(user);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

//get User by email
export async function getUserByEmail(req: Request, res: Response) {
  try {
    const email = req.body.email;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(user);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
} 

//update user by userId
export async function updateUserById(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    if (updatedUser.email) {
      const email = await userService.getUserByEmail(updatedUser.email);
      if (email && !email.deleted && email.email !== "" && !email._id.equals(userId)) {
        res
          .status(STATUS_CODES.CONFLICT)
          .json({ error: "This email is registered to another user" });
        return;
      }
    }
    if (req.query.amountPaid) {
      const amountPaid = parseFloat(req.query.amountPaid as string);
      if (!isNaN(amountPaid)) {
        const user = await userService.getUserById(userId);

        if (!user) {
          res.status(STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
          return;
        } else if (user.role !== "tourist") {
          res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Only tourists can have points" });
          return;
        } else { 

          let userLevelPointRate = POINTS.LEVEL3POINTRATE;
          if(user.level === LEVELS.LEVEL1){
          userLevelPointRate  = POINTS.LEVEL1POINTRATE;
          }
          else if(user.level === LEVELS.LEVEL2){
          userLevelPointRate  = POINTS.LEVEL2POINTRATE;
          }
          updatedUser.points = Math.ceil(user.points as number + amountPaid * userLevelPointRate );
          updatedUser.accumulativePoints = Math.ceil(user.accumulativePoints as number + amountPaid * userLevelPointRate );
          

          if(updatedUser.accumulativePoints >= POINTS.LEVEL1MAXPOINTS) {
            updatedUser.level = LEVELS.LEVEL2;
          }
          if(updatedUser.accumulativePoints >= POINTS.LEVEL2MAXPOINTS) {
            updatedUser.level = LEVELS.LEVEL3;
          } 

        }
      }
    }
    if (req.query.amountRetrieved) {
      const amountRetrieved = parseFloat(req.query.amountRetrieved as string);
      if (!isNaN(amountRetrieved)) {
        const user = await userService.getUserById(userId);
        if (!user) {
          res.status(STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
          return;
        } else{
          updatedUser.balance = user.balance as number + amountRetrieved;
        }
      }
    }
    const user = await userService.updateUserById(userId, updatedUser);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(user);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const userData = req.body;
    if (userData.username && userData.password) {
      const shouldCheckEmail = userData.role !== "admin" && userData.role !== "tourismGovernor";
      const userUsername = await userService.getUserByUsername(userData.username);
      const userEmail = userData.email? await userService.getUserByEmail(userData.email) : undefined;

      if (userUsername && userEmail && shouldCheckEmail && !userUsername.deleted && !userEmail.deleted) {
        res
          .status(STATUS_CODES.CONFLICT)
          .json({ error: "Username already exists and this email is registered to another user" });
        return;
      } else if (userUsername && !userUsername.deleted) {
        res.status(STATUS_CODES.CONFLICT).json({ error: "Username already exists" });
        return;
      } else if (userEmail && shouldCheckEmail && !userEmail.deleted) {
        res
          .status(STATUS_CODES.CONFLICT)
          .json({ error: "This email is registered to another user" });
        return;
      }

      const user = await userService.createUser(userData);
      res.status(STATUS_CODES.CREATED).json(user);
      return;
    }
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Please provide all the required fields!" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
    } else {
      if(user.role === "tourGuide"){
        const filter = {
          owner: userId,
          type: bookingType.Itinerary
        }
        const itinrariesBookings = await gatewayAxiosInstance.get(`/booking/bookings/`, { params: filter });
        const result = itinrariesBookings.data.filter((booking: PopulatedBooking) => booking.selectedDate as Date > new Date());

        if(result.length > MIN_LENGTH){
          res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Tour Guide has itineraries that are not completed yet and there are bookings to those" });
          return;
        }
        else{
          const filter = {
            ownerId: userId
          }
          const itineraries = await entertainmentAxiosInstance.get(`/itineraries/`, { params: filter });
          itineraries.data.forEach(async (itinerary: IItinerary) => {
            await entertainmentAxiosInstance.delete(`/itineraries/${itinerary._id}`);
          });
        }

      }
      else if(user.role === "advertiser"){
        const filter = {
          owner: userId,
          type: bookingType.Activity
        }
        const activitiesBookings = await gatewayAxiosInstance.get(`/booking/bookings/`, { params: filter });
        const result = activitiesBookings.data.filter((booking: PopulatedBooking) => (booking.entity as IActivity).date as Date > new Date());

        if(result.length > MIN_LENGTH){
          res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Advertiser has activites that are not completed yet and there are bookings to those" });
          return;
        }
        else{
          const filter = {
            ownerId: userId
          }
          const activities = await entertainmentAxiosInstance.get(`/activities/`, { params: filter });
          activities.data.forEach(async (activity: IActivity) => {
            await entertainmentAxiosInstance.delete(`/activities/${activity._id}`);
          });
        }
      }
      else if(user.role === "seller"){
        const filter = {
          sellerId: userId
        }
        const products = await productAxiosInstance.get(`/products/`, { params: filter });
        products.data.forEach(async (product: IProduct) => {
          await productAxiosInstance.delete(`/products/${product._id}`);
        });
      }
      const deletedUser = await userService.deleteUser(userId);
      res.status(STATUS_CODES.STATUS_OK).json(deletedUser);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await userService.getUserByUsername(username);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "Username or Password is incorrect" });
      return;
    } else if (user.password !== password) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "Username or Password is incorrect" });
      return;
    } else if (user.approved === false) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "User is not approved yet" });
      return;
    }
    res.status(STATUS_CODES.STATUS_OK).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function addRating(req: Request, res: Response) {
  try {
    const ratedUserId = req.params.id;
    const userRating = req.body as TRating;
    const rating = await userService.addRating(userRating, ratedUserId);
    if (!rating) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
    } else {
      res.status(STATUS_CODES.CREATED).json(rating);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}

export async function redeemPoints(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
      return;
    } else if (user.role !== "tourist") {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Only tourists can redeem points" });
      return;
    } else if(user.points) {
      if (user.points < POINTS.MINPOINTS) {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: "You Have to have at least 10000 points to be able to redeem them!" });
        return;
      } else{
        const updatedUser = user;
        const avgBalance = user.points / POINTS.MINPOINTS;
        updatedUser.points = user.points % POINTS.MINPOINTS;
        updatedUser.balance = user.balance as number + Math.floor(avgBalance) * POINTS.AMOUNTFORMINPOINTS;
        console.log(updatedUser);
        const newUser = await userService.updateUserById(userId, updatedUser);
        res.status(STATUS_CODES.STATUS_OK).json(newUser);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}
