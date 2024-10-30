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
    baseUrl: `${process.env.API_BASE_URL}/artists`,
    queryParams: {
      client_id: process.env.CLIENT_ID,
      hasimage: true,
      limit: 30,
      order: "popularity_month",
    },
  };
  const response: ApiResponse<ArtistResponse> = await fetchData(request);
  return response.results
    .filter((artist: ArtistResponse) => artist.image)
    .map((artist: ArtistResponse) => mapArtist(artist));
};

export default getArtists;
