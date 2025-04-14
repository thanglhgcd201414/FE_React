import { IProduct } from './product.types';

export interface IResponseByBot {
  textResponse: string;
  options: string[];
  quickActions: IQuickAction[];
  metadata: IMetadata;
  content: IProduct[];
}

export type IMetadata = object;

export interface IQuickAction {
  textResponse: string;
  action: string;
}
