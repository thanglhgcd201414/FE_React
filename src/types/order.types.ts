import { EOrderStatus, EPaymentMethod, EPaymentStatus } from "../constants/order-status";
import { IItemCart } from "./cart.types";
import { IUser } from "./user.types";

export interface IOrder {
  userId: IUser;
  items: IItemCart[];
  totalAmount: number;
  paymentStatus: EPaymentStatus;
  paymentMethod: EPaymentMethod;
  orderStatus: EOrderStatus;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}