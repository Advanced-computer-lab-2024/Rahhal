import type { Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import userValidators from '../../validators/user-validators';
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
  hotline?: string;
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
      required: function () {
        return this.role !== Role.advertiser;
      },
      validate: {
        validator: userValidators.validateFirstName,
        message: "Invalid first name entry",
      },
    },
    lastName: {
      type: String,
      //not required for advertiser since he registers with name of company
      //(may be also required if(company representative name is needed)
      required: function () {
        return this.role !== Role.advertiser;
      },
      validate: {
        validator: userValidators.validateLastName,
        message: "Invalid last name entry",
      },
    },
    username: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: userValidators.validateUsername,
        message: "Invalid username entry",
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: userValidators.validateEmail,
        message: "Invalid email entry",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: userValidators.validatePassword,
        message: "Invalid password entry, must be at least 8 characters long",
      },
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
      immutable: true,
    },
    approved: {
      type: Boolean,
      default: function () {
        //tourism governor is added by admin so approved by default
        return (
          this.role === Role.tourist ||
          this.role === Role.tourismGovernor ||
          this.role === Role.admin
        );
      },
      validate: {
        validator: userValidators.validateApproved,
        message: "Invalid approved value entry",
      },
    },
    dob: {
      type: Date,
      required: function () {
        return this.role === Role.tourist;
      },
      validate: {
        validator: userValidators.validateDOB,
        message: "Invalid date of birth entry",
      },
    },
    nationality: {
      type: String,
      required: function () {
        return this.role === Role.tourist;
      },
      validate: {
        validator: userValidators.validateNationality,
        message: "Invalid natiopnality entry",
      },
    },
    job: {
      type: String,
      required: function () {
        return this.role === Role.tourist;
      },
      validate: {
        validator: userValidators.validateJob,
        message: "Invalid job entry",
      },
    },
    addresses: {
      type: [String],
    },
    phoneNumber: {
      type: String,
      required: function () {
        return this.role === Role.tourGuide;
      },
      validate: {
        validator: userValidators.validatePhoneNumber,
        message: "Invalid phone number entry",
      },
    },
    yearsOfExperience: {
      type: Number,
      validate: {
        validator: userValidators.validateYearsOfExperience,
        message: "Invalid number, must be a positive number entry",
      },
      required: function () {
        return this.role === Role.tourGuide;
      },
    },
    previousWork: {
      type: String,
      validate: {
        validator: userValidators.validatePreviousWork,
        message: "Invalid previous work entry",
      },
    },
    website: {
      type: String,
      required: function () {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: userValidators.validateWebsite,
        message: "Invalid website entry",
      },
    },
    hotline: {
      type: String,
      required: function () {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: userValidators.validateHotline,
        message: "Invalid hotline entry",
      },
    },
    companyProfile: {
      type: String,
      required: function () {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: userValidators.validateCompanyProfile,
        message: "Invalid company profile entry",
      },
    },
    companyName: {
      type: String,
      required: function () {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: userValidators.validateCompanyName,
        message: "Invalid company name entry",
      },
    },
    description: {
      type: String,
      required: function () {
        return this.role === Role.seller;
      },
      validate: {
        validator: userValidators.validateDescription,
        message: "Invalid description entry",
      },
    },
  },
  { timestamps: true },
);


const User = mongoose.model<IUser>("User", userSchema);
export default User;