import {
  ApiRequest,
  ApiResponse,
  ArtistRequest,
  ArtistResponse,
} from "@/models/api";
import { Artist } from "@/models/data";
import { mapArtist } from "@/utils/mappers";
import { fetchData } from "./apiDataProvider";

const getArtists = async (): Promise<Artist[]> => {
  const request: ApiRequest<ArtistRequest> = {
    baseUrl: `${process.env.API_BASE_URL}/artists/tracks`,
    queryParams: {
      client_id: process.env.CLIENT_ID,
      hasimage: true,
      order: "popularity_month",
    },
  };
  const response: ApiResponse<ArtistResponse> = await fetchData(request);
  return response.results.map((artist: ArtistResponse) => mapArtist(artist));
};

export default getArtists;
