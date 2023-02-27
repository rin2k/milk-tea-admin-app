import { ICategory } from "@types";
export interface IProduct {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  category: ICategory;
}
