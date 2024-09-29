import mongoose from "mongoose";
const Schema = mongoose.Schema;

enum Role {
  admin,
  tourist,
  tourGuide,
  advertiser,
  seller,
  tourismGovernor,
}

const userSchema = new Schema(
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
        type: Role,
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

const user = mongoose.model("user", userSchema);
module.exports = user;
