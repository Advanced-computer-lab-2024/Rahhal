import { CONSTANTS, STATUS_CODES } from "@/utils/constants";
import * as generalService from "@/services/general-service";
import type { Request, Response } from "express";
import { Role } from "@/utils/auth";
import * as authService from "@/services/auth-service";

export async function signup(req: Request, res: Response) {
  try {
    const userData = req.body;
    const { username, password } = req.body;
    console.log(userData);
    // const cookie = await generalService.signup(userData);
    const user = await generalService.signup(userData);
    // if(cookie){
    //     res.cookie("jwt",cookie , { maxAge: CONSTANTS.MAXAGE});
    // }
    if (user.role === Role.TOURIST) {
      const cookie = await authService.login({ username, password });
      if (cookie.status === STATUS_CODES.STATUS_OK) {
        res.cookie("jwt", cookie.data, {
          sameSite: "lax",

          maxAge: CONSTANTS.MAXAGE,
        });
      }
    }
    res.status(STATUS_CODES.CREATED).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.BAD_GATEWAY).json({ error: error.message });
    }
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.cookie("jwt", " ", {
      sameSite: "lax",
      maxAge: 1,
    });
    res.status(STATUS_CODES.STATUS_OK).json();
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function deleteAccount(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    await generalService.deleteAccount(userId);
    res.cookie("jwt", " ", {
      sameSite: "lax",
      maxAge: 1,
    });
    res.status(STATUS_CODES.STATUS_OK).json();
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}
