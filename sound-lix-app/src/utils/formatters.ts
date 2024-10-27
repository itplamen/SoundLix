import { ApiRequest, BaseRequest } from "@/models/api";

export const formatRequestUrl = <T extends BaseRequest>(
  request: ApiRequest<T>
): string => {
  const entries: [string, string][] = Object.entries(request.queryParams);
  const url: string = `${request.baseUrl}?${entries
    .filter(([key, value]) => key && value)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(
          key.toString().toLowerCase()
        )}=${encodeURIComponent(value.toString().toLowerCase())}`
    )
    .join("&")}`;

  return url;
};

export const formatSecondsToTime = (seconds: number): string => {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");

  return `${min}:${sec}`;
};
