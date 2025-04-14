import { ITicketType } from '../types/ticket.types';

export enum ETicketType {
  VIP = "VIP",
  GENERAL = "GENERAL",
  VIP_PLUS = "VIP_PLUS",
  VIP_PLATINUM = "VIP_PLATINUM",
}

const defineEventType = {
  [ETicketType.VIP]: 'Vé VIP',
  [ETicketType.GENERAL]: 'Vé thường',
  [ETicketType.VIP_PLUS]: 'Vé VIP Plus',
  [ETicketType.VIP_PLATINUM]: 'Vé VIP Platinum',
};

export default function ExtractNameTicketType(type: ITicketType): string {
  return defineEventType[type];
}
