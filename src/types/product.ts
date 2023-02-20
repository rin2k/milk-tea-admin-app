import { Category } from "./category";
export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
}

export interface IProduct {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
}
