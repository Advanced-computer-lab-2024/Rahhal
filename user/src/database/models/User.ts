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
        validator: validateFirstName,
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
        validator: validateLastName,
        message: "Invalid last name entry",
      },
    },
    username: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: validateUsername,
        message: "Invalid username entry",
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: validateEmail,
        message: "Invalid email entry",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: validatePassword,
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
        validator: validateApproved,
        message: "Invalid approved value entry",
      },
    },
    dob: {
      type: Date,
      required: function () {
        return this.role === Role.tourist;
      },
      validate: {
        validator: validateDOB,
        message: "Invalid date of birth entry",
      },
    },
    nationality: {
      type: String,
      required: function () {
        return this.role === Role.tourist;
      },
      validate: {
        validator: validateNationality,
        message: "Invalid natiopnality entry",
      },
    },
    job: {
      type: String,
      required: function () {
        return this.role === Role.tourist;
      },
      validate: {
        validator: validateJob,
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
        validator: validatePhoneNumber,
        message: "Invalid phone number entry",
      },
    },
    yearsOfExperience: {
      type: Number,
      validate: {
        validator: validateYearsOfExperience,
        message: "Invalid number, must be a positive number entry",
      },
      required: function () {
        return this.role === Role.tourGuide;
      },
    },
    previousWork: {
      type: String,
      validate: {
        validator: validatePreviousWork,
        message: "Invalid previous work entry",
      },
      // required: function() {
      //   return this.role === Role.tourGuide;
      // }
    },
    website: {
      type: String,
      required: function () {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: validateWebsite,
        message: "Invalid website entry",
      },
    },
    hotline: {
      type: String,
      required: function () {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: validateHotline,
        message: "Invalid hotline entry",
      },
    },
    companyProfile: {
      type: String,
      required: function () {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: validateCompanyProfile,
        message: "Invalid company profile entry",
      },
    },
    companyName: {
      type: String,
      required: function () {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: validateCompanyName,
        message: "Invalid company name entry",
      },
    },
    description: {
      type: String,
      required: function () {
        return this.role === Role.seller;
      },
      validate: {
        validator: validateDescription,
        message: "Invalid description entry",
      },
    },
  },
  { timestamps: true },
);

function validateFirstName(firstName: string) {
  return typeof firstName === "string" && firstName.length > 0;
}

function validateLastName(lastName: string) {
  return typeof lastName === "string" && lastName.length > 0;
}

function validateUsername(username: string) {
  return (
    typeof username === "string" &&
    username.length > 0 &&
    !username.includes(" ")
  );
}

function validateEmail(email: string) {
  return typeof email === "string" && email.length > 0;
}

function validatePassword(password: string) {
  return typeof password === "string" && password.length > 7;
}

function validateApproved(approved: boolean) {
  return typeof approved === "boolean";
}

function validateDOB(dob: Date) {
  return dob instanceof Date; // && !isNaN(dob.getTime());
}

function validateNationality(nationality: string) {
  return typeof nationality === "string" && nationality.length > 0;
}
function validateJob(job: string) {
  return typeof job === "string" && job.length > 0;
}
function validatePhoneNumber(phoneNumber: string) {
  return typeof phoneNumber === "string" && phoneNumber.length > 0;
}
function validateYearsOfExperience(yearsOfExperience: number) {
  if (yearsOfExperience >= 0) {
    return true;
  }
  return false;
}

function validatePreviousWork(previousWork: string) {
  return typeof previousWork === "string" && previousWork.length > 0;
}

function validateWebsite(website: string) {
  return typeof website === "string" && website.length > 0;
}

function validateHotline(hotline: string) {
  return typeof hotline === "string" && hotline.length > 0;
}

function validateCompanyProfile(companyProfile: string) {
  return typeof companyProfile === "string" && companyProfile.length > 0;
}

function validateCompanyName(companyName: string) {
  return typeof companyName === "string" && companyName.length > 0;
}

function validateDescription(description: string) {
  return typeof description === "string" && description.length > 0;
}
const User = mongoose.model<IUser>("User", userSchema);
export default User;
