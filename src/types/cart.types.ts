import { IProduct } from "./product.types";

export interface IItemCart {
  productId: IProduct;
  sku: string;
  quantity: number
}

export interface ICart {
  _id: string;
  userId: string;
  __v: number;
  createdAt: string;
  items: Item[];
  totalPrice: number;
  updatedAt: string;
}

interface Item {
  productId: IProduct;
  sku: string;
  quantity: number;
  _id: string;
}