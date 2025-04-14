export interface IShippingAddress {
  city: string;
  district: string;
  street: string;
  ward: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  role: IRole;
  phoneNumber: string;
  shippingAddress: IShippingAddress[];
  favoriteProducts?: string[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface IQueryUser {
  page: number;
  limit: number;
  total: number;
  search?: string;
  sort: "ASC" | "DESC";
}

export type IRole = "USER" | "ADMIN";
