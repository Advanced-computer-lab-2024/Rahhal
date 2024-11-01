import { Role } from "../utils/enums";

export type TUser = {
  _id?: string;
  username: string;
  email: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  password: string;
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
};
