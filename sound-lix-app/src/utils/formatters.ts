import { ApiRequest, BaseRequest } from "@/data/models/api";

export const formatRequestUrl = <T extends BaseRequest>(
  request: ApiRequest<T>
): string => {
  const entries: [string, string][] = Object.entries(request.queryParams);
  const url: string = `${request.baseUrl}?${entries
    .filter(([key, value]) => key && value)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key.toLowerCase())}=${encodeURIComponent(
          value.toLowerCase()
        )}`
    )
    .join("&")}`;

  return url;
};
