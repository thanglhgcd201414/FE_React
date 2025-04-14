import { ICategory } from "./category";
import { IReview } from "./review";

export interface IVariants {
  sku: string;
  stock: number;
  price: number;
  originalPrice: number;
  color: string;
  storageCapacity: string;
  specifications: { key: string; value: string }[];
}

export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  ratingAverage?: number;
  brand: string;
  productModel: string;
  categories: ICategory[];
  variants: IVariants[];
  reviews: IReview[];
  images: string[];
  operatingSystem?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}