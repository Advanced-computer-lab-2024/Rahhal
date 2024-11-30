import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as userService from "@/services/user-services/user-service";

export async function getApprovedUsers(req: Request, res: Response) {
  try {
    const users = await userService.getApprovedUsers();
    res.status(users.status).json(users.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getUsersPendingRequests(req: Request, res: Response) {
  try {
    const newUsersRequests = await userService.getUsersPendingRequests();
    res.status(newUsersRequests.status).json(newUsersRequests.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getUserById(req: Request, res: Response) {
  //const userId = req.params.id;
  const userId = res.locals.id;
  try {
    const user = await userService.getUserById(userId);
    res.status(user.status).json(user.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getUserActivities(req: Request, res: Response) {
  // userId = req.params.id;
  const userId = res.locals.id;
  try {
    const activities = await userService.getUserActivities(userId);
    res.status(activities.status).json(activities.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getUserHistoricalPlaces(req: Request, res: Response) {
  //const userId = req.params.id;
  const userId = res.locals.id;
  try {
    const historicalPlaces = await userService.getUserHistoricalPlaces(userId);
    res.status(historicalPlaces.status).json(historicalPlaces.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getUserProducts(req: Request, res: Response) {
  // const userId = req.params.id;
  const userId = res.locals.id;
  try {
    const products = await userService.getUserProducts(userId);
    res.status(products.status).json(products.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}


export async function updateUser(req: Request, res: Response) {
  const userId = req.params.id;
  const amountPaid = req.query.amountPaid as string | undefined;
  const amountRetrieved = req.query.amountRetrieved as string | undefined;
  const userData = req.body;
  try {
    const user = await userService.updateUser(userId, userData, amountPaid, amountRetrieved);
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

export async function redeemPoints(req: Request, res: Response) {
  const userId = req.params.id;
  try {
    const user = await userService.redeemPoints(userId);
    res.status(user.status).json(user.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getNumberOfUsers(req: Request, res: Response) {
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;
  try {
    const users = await userService.getNumberOfUsers(startDate, endDate);
    res.status(users.status).json(users.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
