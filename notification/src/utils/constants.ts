export const STATUS_CODES = {
  NOT_FOUND: 404,
  CREATED: 201,
  STATUS_OK: 200,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  GATEWAY_TIMEOUT: 504,
};

export const CONSTANTS = {
  MIN_RATING: 0,
  MAX_RATING: 5,
  ZERO: 0,
};

export const MESSAGES = {
  NOTIFICATION_NOT_FOUND: "Notificaion not found",
  UNKNOWN_ERROR: "An unknown error occurred",
};

export const RABBITMQ = {
  QUEUE: {
    NOTIFICATION: "notification_queue",
    EVENT_REMINDER: "event_reminder_queue",
    ADMIN_ALERT: "admin_alert_queue",
  },
};
