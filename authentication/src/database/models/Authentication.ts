import type { Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import { Role } from "@/utils/constants";


export interface IAuthentication {
    _id: Types.ObjectId;
    username:string;
    password: string;
    role: Role;
    approved: boolean;
    dob? : Date;
}

const authenticationSchema : Schema = new Schema<IAuthentication>(
    {
        username: {
            type: String,
            required: true,
            immutable: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(Role),
            required: true,
            immutable: true,
          },
          approved:{
            type: Boolean,
            required:true,
            default: function () {
                return (
                  this.role === Role.tourist ||
                  this.role === Role.tourismGovernor ||
                  this.role === Role.admin
                );
            },
          },
          dob: {
            type: Date,
            required: function () {
              return this.role === Role.tourist;
            },
          },
    }
)

const Authentication = mongoose.model<IAuthentication>("Authentication", authenticationSchema);
export default Authentication;
