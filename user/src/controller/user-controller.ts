import { Request, Response } from "express";
import userService from "../service/user-service";

//This file is responsible for handling the request and response from the client.

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(200).json({"data":user});
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error);
    }
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.deleteUser(userId);
    res.status(200).json({"data":user});
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error);
    }
  }
};

export default { createUser, deleteUser };
