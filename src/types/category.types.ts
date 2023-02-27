import { Timestamp } from "firebase/firestore";
export interface ICategory {
  id: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  image?: string;
}
