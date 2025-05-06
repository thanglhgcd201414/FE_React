export const API_URL: string | undefined = import.meta.env.VITE_BASE_URL;

export default function buildImageUrl(image?: string): string {
  if (!image) return '';
  return API_URL + image;
}
