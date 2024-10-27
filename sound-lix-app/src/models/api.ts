export interface BaseRequest {
  client_id: string;
}

export interface ApiRequest<T extends BaseRequest> {
  baseUrl: string;
  queryParams: T;
}

export interface SongRequest extends BaseRequest {
  tags: string;
  imagesize: number;
  include: string;
  boost: string;
  order: string;
}

export const StatusResponse = {
  Success: "success",
  Failed: "failed",
} as const;

type Statuskey = (typeof StatusResponse)[keyof typeof StatusResponse];
export type ApiResponse<T> = {
  headers: {
    status: Statuskey;
    code: number;
    error_message: string;
    results_count: number;
  };
  results: T[];
};

export type SongResponse = {
  id: string;
  name: string;
  duration: number;
  artist_id: string;
  artist_name: string;
  releasedate: string;
  audio: string;
  audiodownload: string;
  image: string;
  lyrics: string;
  audiodownload_allowed: boolean;
};
