import {Request , Response}  from "express";
import * as userService from "../service/user-service";

//This file is responsible for handling the request and response from the client.
//get specific user by username
const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const user = await userService.getUserByUsername(username);
        if (!user) {
             res.status(404).json({message : "User not found"});
        }
        else{
            res.status(200).json(user);
        }
    } catch (error) {
         res.status(500).send(error);
    }
};

//get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        if (users === null) {
            res.status(404).json({message : "No users found"});
        }
        else{
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

//getUserById
const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        if (!user) {
            res.status(404).json({message : "User not found"});
        }
        else{
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

//get User by email
const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            res.status(404).json({message : "User not found"});
        }
        else{
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

//update user by username
const updateUserByUsername = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const updatedUser = req.body;
        const user = await userService.updateUserByUsername(username, updatedUser);
        if (!user) {
            res.status(404).json({message : "User not found"});
        }
        else{
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

//update user by userId
const updateUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;
        const user = await userService.updateUserById(userId, updatedUser);
        if (!user) {
            res.status(404).json({message : "User not found"});
        }
        else{
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};


const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(200).json({"data":user});
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({"error": error.message});
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
      res.status(400).json({"error": error.message});
    }
  }
};

export default {getUserByUsername, getAllUsers, updateUserByUsername, createUser, deleteUser , getUserById , updateUserById , getUserByEmail};

