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

export const formatSecondsToMinutes = (seconds: string): string => {
  const min = String(Math.floor(Number(seconds) / 60)).padStart(2, "0");
  const sec = String(Number(seconds) % 60).padStart(2, "0");

  return `${min}:${sec}`;
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

export const formatTime = (time: string): string => {
  const [minutes, seconds] = time.split(":");
  const paddedMinutes = minutes.padStart(2, "0");

  return `${paddedMinutes}:${seconds}`;
};
