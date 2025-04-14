import { API_URL } from '../plugins/request';

export default function buildImageUrl(image?: string): string {
  if (!image) return '';
  return API_URL + image;
}
