import { Request, Response, NextFunction, RequestHandler } from 'express';
import { STATUS_CODES } from './constants';

export enum Role {
    ADMIN = "admin",
    TOURIST = "tourist",
    TOURGUIDE = "tourGuide",
    ADVERTISER = "advertiser",
    SELLER = "seller",
    TOURISMGOVERNOR = "tourismGovernor",
    GUEST = "guest"
}




export default function grantAccess(roles: Role[]): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!roles.includes(res.locals.role)) {
                res.status(STATUS_CODES.SERVER_ERROR).json({ message: "Access Denied" });
                return;
            }
            next();
        } catch (error) {
            res.status(STATUS_CODES.BAD_GATEWAY).json(error);
        }
    }
}