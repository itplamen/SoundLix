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

export const formatSecondsToMinutes = (seconds: number): string => {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");

  return `${min}:${sec}`;
};

export const formatSecondsToHours = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const min = Math.floor((seconds % 3600) / 60);

  const formattedTime =
    `${hours} hr${hours !== 1 ? "s" : ""} ` +
    `${min} min${min !== 1 ? "s" : ""} `;

  return formattedTime.trim();
};
