export interface BaseRequest {
  client_id: string;
}

export interface BaseResponse {
  id: string;
  name: string;
}

export interface ApiRequest<T extends BaseRequest> {
  baseUrl: string;
  queryParams: T;
}

export const StatusResponse = {
  Success: "success",
  Failed: "failed",
} as const;
type Statuskey = (typeof StatusResponse)[keyof typeof StatusResponse];

export type ApiResponse<T extends BaseResponse> = {
  headers: {
    status: Statuskey;
    code: number;
    error_message: string;
    results_count: number;
  };
  results: T[];
};

export interface PlaylistRequest extends BaseRequest {
  user_id: number;
  id?: number;
}

export interface PlaylistResponse extends BaseResponse {
  creationdate: string;
  zip: string;
  tracks: SongResponse[];
}

export interface ArtistRequest extends BaseRequest {
  hasimage: boolean;
  order: string;
  limit: number;
}

export interface ArtistResponse extends BaseResponse {
  website: string;
  joindate: string;
  image: string;
}

export interface SongRequest extends BaseRequest {
  tags: string;
  imagesize: number;
  include: string;
  boost: string;
  order: string;
}

export interface SongResponse extends BaseResponse {
  id: string;
  name: string;
  duration: number;
  artist_id: string;
  artist_name: string;
  position: number;
  releasedate: string;
  audio: string;
  audiodownload: string;
  image: string;
  lyrics: string;
  audiodownload_allowed: boolean;
}
