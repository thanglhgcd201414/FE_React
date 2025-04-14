export default function buildUrlWithParams(
  url: string,
  params: Record<string, any>
): string {
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return `${url}?${queryString}`;
}
