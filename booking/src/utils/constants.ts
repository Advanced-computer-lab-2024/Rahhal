export const STATUS_CODES = {
  NOT_FOUND: 404,
  CREATED: 201,
  STATUS_OK: 200,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  NOT_FOUND: "Not Found",
  BAD_REQUEST: "Bad Request",
  SERVER_ERROR: "Internal Server Error",
  GATEWAY_TIMEOUT: "Gateway Timeout",
  BAD_GATEWAY: "Bad Gateway",
};

export const RABBITMQ = {
  QUEUE: {
    EVENT_REMINDER: "event_reminder_queue",
  },
};
