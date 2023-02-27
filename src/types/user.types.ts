import { Timestamp } from "firebase/firestore";
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
}
