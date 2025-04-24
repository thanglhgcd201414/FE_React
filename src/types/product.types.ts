import { ICategory } from "./category";

export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  categories: ICategory[];
  images: string[];
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}