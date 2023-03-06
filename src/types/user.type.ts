import { Timestamp } from "firebase/firestore";
import { UserStatus } from "@types";
export interface IUser {
  fullname: string;
  email: string;
  addresses: Array<{
    name: string;
    address: string;
    phone: string;
  }>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  id: string;
  status: keyof typeof UserStatus;
}
