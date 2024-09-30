import {Request , Response}  from "express";
import * as userService from "../service/user-service";

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

//update user by usernaem
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

export default {getUserByUsername, getAllUsers, updateUserByUsername};