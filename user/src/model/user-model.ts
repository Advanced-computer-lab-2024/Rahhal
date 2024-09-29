
// import { Schema, Types, model } from 'mongoose';

import mongoose, { Schema, Document, Types } from 'mongoose';
// const Schema = mongoose.Schema;

enum Role {
  admin='admin',
  tourist='tourist',   
  tourGuide='tourGuide',
  advertiser='advertiser',
  seller='seller',
  tourismGovernor='tourismGovernor'
}

// type Role = 'admin' | 'tourist' | 'tourGuide' | 'advertiser' | 'seller' | 'tourismGovernor';
export interface iUser extends Document {
    _id: Types.ObjectId,
    firstName?: string,
    lastName?: string,
    userName: string,
    email: string,
    password: string,
    /*role: string, */                    role: Role,
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

const userSchema: Schema = new Schema<iUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
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

// const user = mongoose.model<iUser>("user", userSchema);
// module.exports = {user};

export default mongoose.model<iUser>('user', userSchema);
