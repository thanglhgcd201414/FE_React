type IStatusResponse = 200 | 400 | 401 | 403 | 500;

export interface IBaseResponse<T> {
  data: T;
  message: string;
  status: IStatusResponse;
  timestamp: string;
}

export interface IMetadata {
  page: number;
  totalItem: number;
  totalPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IBaseResponseList<T> {
  content: T;
  metaData: IMetadata;
}

