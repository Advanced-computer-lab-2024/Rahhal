import type { Request, Response } from "express";
import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as userService from "@/services/user-service";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    res.status(users.status).json(users.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getUserById(req: Request, res: Response) {
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    res.status(user.status).json(user.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getUserActivities(req: Request, res: Response) {
  const userId = req.params.id;
  try {
    const activities = await userService.getUserActivities(userId);
    res.status(activities.status).json(activities.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getUserHistoricalPlaces(req: Request, res: Response) {
  const userId = req.params.id;
  try {
    const historicalPlaces = await userService.getUserHistoricalPlaces(userId);
    res.status(historicalPlaces.status).json(historicalPlaces.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createUser(req: Request, res: Response) {
  const userData = req.body;
  try {
    const user = await userService.createUser(userData);
    res.status(user.status).json(user.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updateUser(req: Request, res: Response) {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const user = await userService.updateUser(userId, userData);
    res.status(user.status).json(user.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function deleteUser(req: Request, res: Response) {
  const userId = req.params.id;
  try {
    const user = await userService.deleteUser(userId);
    res.status(user.status).json(user.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
