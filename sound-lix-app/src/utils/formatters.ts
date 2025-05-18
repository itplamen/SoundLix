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

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const formatSecondsToHours = (seconds: string): string => {
  const hours = Math.floor(Number(seconds) / 3600);
  const min = Math.floor((Number(seconds) % 3600) / 60);
  const sec = Number(seconds) % 60;

  const formattedTime =
    `${hours > 0 ? `${hours} hr${hours !== 1 ? "s" : ""} ` : ""}` +
    `${min} min${min !== 1 ? "s" : ""} ` +
    `${sec} sec${sec !== 1 ? "s" : ""}`;

  return formattedTime.trim();
};
