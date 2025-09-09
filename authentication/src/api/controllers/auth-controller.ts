import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as authService from "@/services/auth-service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.status(STATUS_CODES.STATUS_OK).json(token);
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const userData = req.body;
    await authService.signup(userData);
    res.status(STATUS_CODES.STATUS_OK).json();
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const { id, oldPassword, newPassword } = req.body;
    const changePassword = await authService.changePassword(id, oldPassword, newPassword);
    res.status(STATUS_CODES.STATUS_OK).json(changePassword);
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function authenticate(req: Request, res: Response) {
  try {
    const token = req.params.token;
    if (!token) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ error: "No token provided" });
    }
    jwt.verify(token, process.env.SECRETKEY!, (err: unknown, decodedToken: unknown) => {
      if (err) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ error: "Invalid token" });
      } else {
        console.log(decodedToken);
        res.status(STATUS_CODES.STATUS_OK).json(decodedToken);
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function approveUser(req: Request, res: Response) {
  try {
    const { id, approved } = req.body;
    await authService.approveUser(id, approved);
    res.status(STATUS_CODES.STATUS_OK).json();
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await authService.deleteUser(id);
    res.status(STATUS_CODES.STATUS_OK).json();
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    const { username } = req.body;
    await authService.sendOTP(username);
    res.status(STATUS_CODES.STATUS_OK).json();
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function verifyOTP(req: Request, res: Response) {
  try {
    const { username, otp } = req.body;
    console.log(req.body);
    await authService.verifyOTP(username, otp);
    res.status(STATUS_CODES.STATUS_OK).json();
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    await authService.resetPassword(username, password);
    res.status(STATUS_CODES.STATUS_OK).json();
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json({ error: error.message });
    }
  }
}
