import type { Request, Response } from "express";
import * as userService from "@/services/user-service";
import { Role, STATUS_CODES } from "@/utils/constants";
import { z } from "zod";
import { ObjectId } from "mongodb";
import type { TRating } from "@/types";
import { POINTS } from "@/utils/constants";

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
    const users = await userService.getAllUsers({ approved: approved });
    if (!users) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "No users found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(users);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await userService.getUser({ _id: new ObjectId(userId) });
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

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    let updatedUser = req.body;
    if (updatedUser.email) {
      const email = await userService.getUser({ email: updatedUser.email });
      if (email && !email.deleted && email.email !== "" && !email._id.equals(userId)) {
        res
          .status(STATUS_CODES.CONFLICT)
          .json({ error: "This email is registered to another user" });
        return;
      }
    }
    const user = await userService.getUser({ _id: new ObjectId(userId) });
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
      return;
    }
    if (req.query.amountPaid) {
      const amountPaid = parseFloat(req.query.amountPaid as string);
      if (!isNaN(amountPaid)) {
        if (user.role !== Role.tourist) {
          res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Only tourists can have points" });
          return;
        } else {
          updatedUser = userService.updatePointsAndLevel(user, amountPaid);
        }
      }
    }
    if (req.query.amountRetrieved) {
      const amountRetrieved = parseFloat(req.query.amountRetrieved as string);
      if (!isNaN(amountRetrieved)) {
        updatedUser.balance = (user.balance as number) + amountRetrieved;
      }
    }
    const userUpdated = await userService.updateUser(userId, updatedUser);
    res.status(STATUS_CODES.STATUS_OK).json(userUpdated);
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const userData = req.body;
    if (userData.username) {
      const shouldCheckEmail =
        userData.role !== Role.admin && userData.role !== Role.tourismGovernor;
      const userUsername = await userService.getUser({ username: userData.username });
      const userEmail = userData.email
        ? await userService.getUser({ email: userData.email })
        : undefined;

      if (
        userUsername &&
        userEmail &&
        shouldCheckEmail &&
        !userUsername.deleted &&
        !userEmail.deleted
      ) {
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
    const deletedUser = await userService.deleteUser(userId);
    res.status(STATUS_CODES.STATUS_OK).json(deletedUser);
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
    const user = await userService.getUser({ _id: new ObjectId(userId) });
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
      return;
    } else if (user.role !== Role.tourist) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Only tourists can redeem points" });
      return;
    } else {
      if (user.points! < POINTS.MINPOINTS) {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: "You Have to have at least 10000 points to be able to redeem them!" });
        return;
      } else {
        const newUser = await userService.redeemPoints(user);
        res.status(STATUS_CODES.STATUS_OK).json(newUser);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function getNumberOfUsers(req: Request, res: Response) {
  try {
    const queryParametersSchema = z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    });

    const validationResult = queryParametersSchema.safeParse(req.query);

    if (!validationResult.success) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: validationResult.error });
      return;
    }

    const { startDate, endDate } = validationResult.data;

    const startDateObj = startDate ? new Date(startDate) : undefined;
    const endDateObj = endDate ? new Date(endDate) : undefined;

    if (startDateObj && isNaN(startDateObj.getTime())) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Invalid startDate format" });
      return;
    }

    if (endDateObj && isNaN(endDateObj.getTime())) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Invalid endDate format" });
      return;
    }

    const numberOfUsers = await userService.getNumberOfUsers(startDateObj, endDateObj);
    res.status(STATUS_CODES.STATUS_OK).json({ numberOfUsers });
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}
