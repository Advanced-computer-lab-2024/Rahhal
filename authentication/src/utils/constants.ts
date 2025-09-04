export enum Role {
    admin = "admin",
    tourist = "tourist",
    tourGuide = "tourGuide",
    advertiser = "advertiser",
    seller = "seller",
    tourismGovernor = "tourismGovernor",
  }


export const STATUS_CODES = {
    NOT_FOUND: 404,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    CREATED: 201,
    STATUS_OK: 200,
    SERVER_ERROR: 500,
    UNPROCESSABLE_ENTITY: 422,
    UNAUTHORIZED: 401,
  };


export const MAXAGE = 86400000;

export const OTP_LENGTH = 6;
export const TEN = 10;

export const RABBITMQ = {
  QUEUE: {
    NOTIFICATION: "notification_queue",
  },
};
