import mongoose, { Schema, Types } from 'mongoose';

enum Role {
  admin = "admin",
  tourist = "tourist",
  tourGuide = "tourGuide",
  advertiser = "advertiser",
  seller = "seller",
  tourismGovernor = "tourismGovernor",
}

export interface IUser {
  _id: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  approved: boolean;
  dob?: Date;
  nationality?: string;
  job?: string;
  addresses?: string[];
  phoneNumber?: string;
  yearsOfExperience?: number;
  previousWork?: string;
  website?: string;
  hotline?: number;
  companyProfile?: string;
  companyName?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      //not required for advertiser since he registers with name of company 
      //(may be also required if(company representative name is needed)
      required: function() {
        return this.role !== Role.advertiser;
      }
    },
    lastName: {
      type: String,
      //not required for advertiser since he registers with name of company
      //(may be also required if(company representative name is needed)
      required: function() {
        return this.role !== Role.advertiser;
      }
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
      default: function() {
        //tourism governor is added by admin so approved by default
        return this.role === Role.tourist || this.role === Role.tourismGovernor;
      }
    },
    // May add conditional required (eg: required if role is tourist)
    dob: {
      type: Date,
      required: function() {
        return this.role === Role.tourist;
      }
    },
    nationality: {
      type: String,
      required: function() {
        return this.role === Role.tourist;
      }
    },
    job: {
      type: String,
      required: function() {
        return this.role === Role.tourist;
      }
    },
    addresses: {
      type: [String],
    },
    phoneNumber: {
      type: String,
      required: function() {
        return this.role === Role.tourGuide;
      }
    },
    yearsOfExperience: {
      type: Number,
      validate: {
        validator: validateYearsOfExperience,
        message:
          "Invalid number, must be a positive number",
      },
      required: function() {
        return this.role === Role.tourGuide;
      }
    },
    previousWork: {
      type: String,
      required: function() {
        return this.role === Role.tourGuide;
      }
    },
    website: {
      type: String,
      required: function() {
        return this.role === Role.advertiser;
      }
    },
    hotline: {
      type: Number,
      required: function() {
        return this.role === Role.advertiser;
      }
    },
    companyProfile: {
      type: String,
      required: function() {
        return this.role === Role.advertiser;
      }
    },
    companyName: {
      type: String,
      required: function() {
        return this.role === Role.advertiser;
      }
    },
    description: {
      type: String,
      required: function() {
        return this.role === Role.seller;
      }
    },
  },
  { timestamps: true },
);

// Validate price format to be a number or an object { min: number, max: number } and to be greater than or equal to 0
function validateYearsOfExperience(yearsOfExperience: number) {
  if(yearsOfExperience >= 0) {
    return true;
  }
  return false;
}

const User = mongoose.model<IUser>("User", userSchema);
export default User;
