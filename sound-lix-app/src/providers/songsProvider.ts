import {
  ApiRequest,
  ApiResponse,
  SongRequest,
  SongResponse,
} from "../models/api";
import { fetchData } from "./apiDataProvider";

const getSongs = async (): Promise<void> => {
  const request: ApiRequest<SongRequest> = {
    baseUrl: "https://api.jamendo.com/v3.0/tracks/",
    queryParams: {
      client_id: process.env.CLIENT_ID,
      boost: "popularity_month",
      imagesize: 300,
      include: "lyrics",
      tags: "house",
    },
  };
  const response: ApiResponse<SongResponse> = await fetchData(request);
};

export { getSongs };
