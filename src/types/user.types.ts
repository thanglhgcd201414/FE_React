export interface IUser {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  role: IRole;
  phoneNumber: string;
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
