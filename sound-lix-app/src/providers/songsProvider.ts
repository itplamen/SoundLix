import { Genre, Song } from "@/models/data";
import {
  ApiRequest,
  ApiResponse,
  SongRequest,
  SongResponse,
} from "../models/api";
import { fetchData } from "./apiDataProvider";

const getSongs = async (genre?: Genre): Promise<Song[]> => {
  const request: ApiRequest<SongRequest> = {
    baseUrl: "https://api.jamendo.com/v3.0/tracks/",
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

  return response.results.map((response: SongResponse) => {
    const song: Song = {
      id: Number(response.id),
      name: response.name,
      duration: response.duration,
      released: new Date(response.releasedate),
      audio: response.audio,
      downloadUrl: response.audiodownload,
      image: response.image,
      lyrics: response.lyrics,
      downloadAllowed: response.audiodownload_allowed,
      genre: genre,
      artist: {
        id: Number(response.artist_id),
        name: response.artist_name,
      },
    };

    return song;
  });
};

export { getSongs };
