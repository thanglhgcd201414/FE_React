import { IUser } from "./user.types";

export interface IReview {
  productId: string;
  userId: IUser;
  rating: number;
  comment: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}