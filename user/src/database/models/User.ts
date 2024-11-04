import type { Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import userValidators from "@/validators/user-validators";
import type { TRating } from "@/types";

export enum Role {
  admin = "admin",
  tourist = "tourist",
  tourGuide = "tourGuide",
  advertiser = "advertiser",
  seller = "seller",
  tourismGovernor = "tourismGovernor",
}
interface ICreditCard {
  cardNumber: string;
  expirationDate: Date;
  cvv: number;
}

interface IWallet {
  creditCard: ICreditCard[];
  defaultCreditCardIndex: number;
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
  balance: number;
  points: number;
  ratings?: TRating[];
  preferences?: string[];
  wallet?: IWallet;
  createdAt: Date;
  updatedAt: Date;
}

const ratingSchema = new Schema<TRating>({
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: false },
});

const userSchema: Schema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      //not required for advertiser since he registers with name of company
      //(may be also required if(company representative name is needed)
      required: function () {
        return (
          this.role !== Role.advertiser &&
          this.role !== Role.tourismGovernor &&
          this.role !== Role.admin
        );
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
        return (
          this.role !== Role.advertiser &&
          this.role !== Role.tourismGovernor &&
          this.role !== Role.admin
        );
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
      immutable: true,
    },
    email: {
      type: String,
      // unique: function () {
      //   return this.role !== Role.admin && this.role !== Role.tourismGovernor;
      // },
      required: function () {
        return this.role !== Role.tourismGovernor && this.role !== Role.admin;
      },
      // validate: {
      //   validator: userValidators.validateEmail,
      //   message: "Invalid email entry",
      // },
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
    points: {
      type: Number,
      default: 0,
      validate: {
        validator: userValidators.validatePoints,
        message: "Invalid points entry",
      },
    },
    balance: {
      type: Number,
      default: 0,
      validate: {
        validator: userValidators.validateBalance,
        message: "Invalid wallet balance entry",
      },
      required: function () {
        return this.role === Role.tourist;
      },
    },
    wallet: {
      type: {
        creditCard: {
          cardNumber: {
            type: String,
            default: "",
            required: true,
            validate: {
              validator: userValidators.validateCardNumber,
              message: "Invalid card number entry",
            },
          },
          expirationDate: {
            type: Date,
            default: null,
            required: true,
            validate: {
              validator: userValidators.validateExpirationDate,
              message: "Invalid expiration date entry",
            },
          },
          cvv: {
            type: String,
            default: "",
            required: true,
            validate: {
              validator: userValidators.validateCVV,
              message: "Invalid CVV entry",
            },
          },
        },
        defaultCreditCardIndex: {
          type: Number,
          default: 0,
          validate: {
            validator: userValidators.validateDefaultCreditCardIndex,
            message: "Invalid default credit card index entry",
          },
        },
      },
      // validate: {
      //   validator: userValidators.validateWallet,
      //   message: "Invalid wallet entry",
      // },
    },
    ratings: {
      type: [ratingSchema],
    },
    preferences:{
      type:[String],
      // required: function () {
      //   return this.role === Role.tourist;
      // },
      // default:[]
    },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
