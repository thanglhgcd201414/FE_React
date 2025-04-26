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

  // Metadata có thể chứa thông tin PayPal
  metadata?: {
    paypalOrderId?: string;
    paypalTransactionId?: string;
    [key: string]: any;
  };

  // Các trường PayPal cũ (để tương thích ngược)
  paypalTransactionId?: string;
  paypalOrderId?: string;

  // Shipping address
  shippingAddress?: {
    city: string;
    district: string;
    street: string;
    ward?: string;
  };
  phoneNumber?: string;
}