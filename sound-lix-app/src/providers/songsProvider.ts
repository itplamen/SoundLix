import { Genre, Song } from "@/models/data";
import {
  ApiRequest,
  ApiResponse,
  SongRequest,
  SongResponse,
} from "../models/api";
import { fetchData } from "./apiDataProvider";
import { mapSong } from "@/utils/mappers";

const getSongs = async (genre?: Genre): Promise<Song[]> => {
  const request: ApiRequest<SongRequest> = {
    baseUrl: `${process.env.API_BASE_URL}/tracks`,
    queryParams: {
      client_id: process.env.CLIENT_ID,
      boost: "popularity_month",
      order: "popularity_month",
      imagesize: 300,
      include: "lyrics",
      tags: genre ?? "",
    },
  };
  const response: ApiResponse<SongResponse> = await fetchData(request);

  return response.results.map((response: SongResponse) => mapSong(response));
};

export { getSongs };
