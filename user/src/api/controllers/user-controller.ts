import type { Request, Response } from "express";
import * as userService from "../../services/user-service";
import { STATUS_CODES } from "../../utils/constants";

const getUserByUsername = async (req: Request, res: Response) => {
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
};

//get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    if (!users) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "No users found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(users);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
};

//getUserById
const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(user);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
};

//get User by email
const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(user);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
};

//update user by username
const updateUserByUsername = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const updatedUser = req.body;
    const user = await userService.updateUserByUsername(username, updatedUser);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(user);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
};

//update user by userId
const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const user = await userService.updateUserById(userId, updatedUser);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(user);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(STATUS_CODES.CREATED).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
    } else {
      const deletedUser = await userService.deleteUser(userId);
      res.status(STATUS_CODES.STATUS_OK).json(deletedUser);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
};

export default {
  getUserByUsername,
  getAllUsers,
  updateUserByUsername,
  createUser,
  deleteUser,
  getUserById,
  updateUserById,
  getUserByEmail,
};
