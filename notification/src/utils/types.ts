export interface INotification {
  userId: string;
  email: string;
  message: string;
  seen?: boolean;
  createdAt?: Date;
}
