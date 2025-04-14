import { EOrderReviewed, EOrderStatus, EPaymentMethod, EPaymentStatus } from "../constants/order-status";
import { IItemCart } from "./cart.types";
import { IShippingAddress, IUser } from "./user.types";

export interface IOrder {
  userId: IUser;
  phoneNumber: string;
  items: IItemCart[];
  totalAmount: number;
  paymentStatus: EPaymentStatus;
  paymentMethod: EPaymentMethod;
  shippingAddress: IShippingAddress;
  orderStatus: EOrderStatus;
  reviewed: EOrderReviewed;
  trackingNumber: string;
  note: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}