import { Timestamp } from "firebase/firestore";
export interface Category {
  name: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
export interface ICategory {
  id: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  image?: string;
}
