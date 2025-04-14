import { EEventType, IEventType } from '../types/product.types';

const defineEventType = {
  [EEventType.MUSIC_CONCERT]: 'Đại hội âm nhạc',
  [EEventType.CULTURAL_ARTS]: 'Văn hóa nghệ thuật',
  [EEventType.TRAVEL]: 'Du lịch',
  [EEventType.WORKSHOP]: 'Hội thảo',
  [EEventType.MOVIE]: 'Chiếu phim',
  [EEventType.TOUR]: 'Tour du lịch',
  [EEventType.SPORTS]: 'Thể thao',
  [EEventType.NEWS]: 'Tin tức',
  [EEventType.OTHER]: 'Khác',
};

export default function ExtractNameEventType(type: IEventType): string {
  return defineEventType[type];
}
