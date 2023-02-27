import { OrderStatus } from "@types";
import { Timestamp } from "firebase/firestore";

export interface IOrderProducts {
  quantity: number;
  price: number;
  productId: string;
  name: string;
}

export interface IOrder {
  id: string;
  uid: string;
  phone: string;
  address: string;
  totalCost: number;
  status: keyof typeof OrderStatus;
  date: Timestamp;
  orderProduct: Array<IOrderProducts>;
}
