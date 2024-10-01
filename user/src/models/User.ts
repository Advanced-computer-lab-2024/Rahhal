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
      required: function() {
        return this.role !== Role.advertiser;
      },
      validate: {
        validator: function(firstName:string){
          return typeof firstName === 'string' && firstName.length > 0 ;
        },
        message: "Invalid first name entry",
      },
    },
    lastName: {
      type: String,
      //not required for advertiser since he registers with name of company
      //(may be also required if(company representative name is needed)
      required: function() {
        return this.role !== Role.advertiser;
      },
      validate: {
        validator: function(lastName:string){
          return typeof lastName === 'string' && lastName.length > 0;
        },
        message: "Invalid last name entry",
      },
    },
    username: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function(username:string){
          return typeof username === 'string' && username.length > 0;
        },
        message: "Invalid username entry",
      },
      // immutable: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function(email:string){
          return typeof email === 'string' && email.length > 0 ;
        },
        message: "Invalid email entry",
      },
      // immutable: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function(password:string){
          return typeof password === 'string' && password.length > 7;
        },
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
      default: function() {
        //tourism governor is added by admin so approved by default
        return this.role === Role.tourist || this.role === Role.tourismGovernor || this.role === Role.admin;
      },
      validate: {
        validator: function(approved:boolean){
          return typeof approved === 'boolean';
        },
        message: "Invalid approved value entry",
      },
    },
    // May add conditional required (eg: required if role is tourist)
    dob: {
      type: Date,
      required: function() {
        return this.role === Role.tourist;
      },
      validate: {
        validator: function(dob:Date){
          return dob instanceof Date;// && !isNaN(dob.getTime());
        },
        message: "Invalid date of birth entry",
      },
    },
    nationality: {
      type: String,
      required: function() {
        return this.role === Role.tourist;
      },
      validate: {
        validator: function(nationality:string){
          return typeof nationality === 'string' && nationality.length > 0;
        },
        message: "Invalid natiopnality entry",
      },

    },
    job: {
      type: String,
      required: function() {
        return this.role === Role.tourist;
      },
      validate: {
        validator: function(job:string){
          return typeof job === 'string'&&  job.length > 0;
        },
        message: "Invalid job entry",
      },
    },
    addresses: {
      type: [String],
    },
    phoneNumber: {
      type: String,
      required: function() {
        return this.role === Role.tourGuide;
      },
      validate: {
        validator: function(phoneNumber:string){
          return typeof phoneNumber === 'string' && phoneNumber.length > 0;
        },
        message: "Invalid phone number entry",
      },
    },
    yearsOfExperience: {
      type: Number,
      validate: {
        validator: validateYearsOfExperience,
        message:
          "Invalid number, must be a positive number entry",
      },
      required: function() {
        return this.role === Role.tourGuide;
      }
    },
    previousWork: {
      type: String,
      validate: {
        validator: function(previousWork:string){
          return typeof previousWork === 'string'&& previousWork.length > 0  ;
        },
        message: "Invalid previous work entry"
      },
      // required: function() {
      //   return this.role === Role.tourGuide;
      // }
    },
    website: {
      type: String,
      required: function() {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: function(website:string){
          return typeof website === 'string' && website.length > 0;
        },
        message: "Invalid website entry"
      },
    },
    hotline: {
      type: String,
      required: function() {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: function(hotline:string){
          return typeof hotline === 'string' && hotline.length > 0;
        },
        message: "Invalid hotline entry"
      },
    },
    companyProfile: {
      type: String,
      required: function() {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: function(companyProfile:string){
          return typeof companyProfile === 'string' && companyProfile.length > 0 ;
        },
        message: "Invalid company profile entry"
      },
    },
    companyName: {
      type: String,
      required: function() {
        return this.role === Role.advertiser;
      },
      validate: {
        validator: function(companyName:string){
          return  typeof companyName === 'string'&&companyName.length > 0;
        },
        message: "Invalid company name entry"
      },
    },
    description: {
      type: String,
      required: function() {
        return this.role === Role.seller;
      },
      validate: {
        validator: function(description:string){
          return typeof description === 'string' && description.length > 0;
        },
        message: "Invalid description entry"
      },
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
