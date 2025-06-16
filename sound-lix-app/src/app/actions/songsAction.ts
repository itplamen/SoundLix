import { Genre, Song } from "@/models/data";
import {
  ApiRequest,
  ApiResponse,
  SongRequest,
  SongResponse,
} from "@/models/api";

import { mapSong } from "@/utils/mappers";
import { fetchData } from "@/api/fetchApi";

const getSongs = async (limit: number = 10, genre?: Genre): Promise<Song[]> => {
  const request: ApiRequest<SongRequest> = {
    baseUrl: `${process.env.API_BASE_URL}/tracks`,
    queryParams: {
      client_id: process.env.CLIENT_ID,
      boost: "popularity_month",
      order: "popularity_month",
      imagesize: 300,
      tags: genre ?? "",
      limit: limit.toString(),
    },
  };
  const response: ApiResponse<SongResponse> = await fetchData(request);

  return response.results
    .map((response: SongResponse) => mapSong(response))
    .sort((a: Song, b: Song) => a.id.localeCompare(b.id));
};

const getSong = async (id: number): Promise<Song> => {
  const request: ApiRequest<SongRequest> = {
    baseUrl: `${process.env.API_BASE_URL}/tracks`,
    queryParams: {
      client_id: process.env.CLIENT_ID,
      id: id,
      imagesize: 300,
      include: "lyrics+musicinfo",
    },
  };
  const response: ApiResponse<SongResponse> = await fetchData(request);
  const mapped: Song[] = response.results.map((response: SongResponse) =>
    mapSong(response)
  );

  return mapped[0];
};

export { getSongs, getSong };
