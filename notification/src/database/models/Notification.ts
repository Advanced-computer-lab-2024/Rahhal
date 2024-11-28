import mongoose from 'mongoose';
import type { INotification } from '@/utils/types';

const notificationSchema = new mongoose.Schema<INotification>({
  userId: { type: String, required: true, index: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  seen: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model('Notification', notificationSchema);
