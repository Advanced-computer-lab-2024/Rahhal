import * as userService from "@/services/user-services/user-service";
import type { IPayload } from "@/utils/types";
import * as authService from "@/services/auth-service";
import { STATUS_CODES } from "@/utils/constants";



export async function signup(body: any) {
    const pass = body.password;
    delete body.password;
    const { data: user, status } = await userService.createUser(body);
    if (status === STATUS_CODES.CREATED) {
        const payload: IPayload = {
            id: user!._id,
            username: user!.username,
            password: pass,
            role: user!.role,
        };
        if (user!.role === "tourist") {
            payload.dob = user!.dob;
        };
        const { data: cookie } = await authService.signup(payload);
        return cookie;
    }
    else {
        throw new Error(user.error);
    }
}

