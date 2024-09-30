import mongoose, { Schema, Types } from 'mongoose';

enum Role {
  admin = "admin",
  tourist = "tourist",
  tourGuide = "tourGuide",
  advertiser = "advertiser",
  seller = "seller",
  tourismGovernor = "tourismGovernor",
}

export interface IUser{
    _id: Types.ObjectId,
    firstName?: string,
    lastName?: string,
    username: string,
    email: string,
    password: string,
    role: Role,
    approved: boolean
    dob?: Date,
    nationality?: string,
    job?: string,
    addresses?: string[],
    phoneNumber?: string,
    yearsOfExperience?: number,
    previousWork?: string,
    website?: string,
    hotline?: number,
    companyProfile?: string,
    companyName?: string,
    createdAt: Date,
    updatedAt: Date
}

const userSchema: Schema = new Schema<IUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
    approved: {
        type: Boolean,
        default: false
    },
    // May add conditional required (eg: required if role is tourist)
    dob: {
      type: Date,
    },
    nationality: {
      type: String,
    },
    job: {
      type: String,
    },
    addresses: {
      type: [String],
    },
    phoneNumber: {
      type: String,
    },
    yearsOfExperience: {
      type: Number,
    },
    previousWork: {
      type: String,
    },
    website: {
      type: String,
    },
    hotline: {
      type: Number,
    },
    companyProfile: {
      type: String,
    },
    companyName: {
      type: String,
    },
  },
  { timestamps: true },
);



const User = mongoose.model<IUser>('User', userSchema);
export default User;
