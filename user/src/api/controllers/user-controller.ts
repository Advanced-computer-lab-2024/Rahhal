import type { Request, Response } from "express";
import * as userService from "@/services/user-service";
import { Role, STATUS_CODES } from "@/utils/constants";
import { z } from "zod";
import type { TRating } from "@/types";
import { POINTS} from "@/utils/constants";



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
    let updatedUser = req.body;
    if (updatedUser.email) {
      const email = await userService.getUserByEmail(updatedUser.email);
      if (email && !email.deleted && email.email !== "" && !email._id.equals(userId)) {
        res
          .status(STATUS_CODES.CONFLICT)
          .json({ error: "This email is registered to another user" });
        return;
      }
    }
    const user = await userService.getUserById(userId);
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
    res.status(STATUS_CODES.STATUS_OK).json(user);
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
      const shouldCheckEmail = userData.role !== Role.admin && userData.role !== Role.tourismGovernor;
      const userUsername = await userService.getUserByUsername(userData.username);
      const userEmail = userData.email
        ? await userService.getUserByEmail(userData.email)
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
        const newUser = userService.redeemPoints(user);
        res.status(STATUS_CODES.STATUS_OK).json(newUser);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}


