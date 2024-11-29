import { Role } from "../utils/enums";

type TCreditCard = {
  cardHolderName: string;
  cardNumber: string;
  expirationDate: Date;
  cvv: string;
};

type TWallet = {
  creditCard: ICreditCard[];
  defaultCreditCardIndex: number;
};

export type TUser = {
  _id: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  // password: string;
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
  profilePicture?: string;
  companyName?: string;
  description?: string;
  balance?: number;
  points?: number;
  accumulativePoints?: number;
  level?: Level;
  ratings?: TRating[];
  preferences?: string[];
  wallet?: IWallet;
  nationalID?: string;
  taxRegistration?: string;
  certificates?: string[];
  wallet?: IWallet;
  createdAt?: Date;
  updatedAt?: Date;
};
