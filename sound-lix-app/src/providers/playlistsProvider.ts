import {
  ApiRequest,
  ApiResponse,
  PlaylistRequest,
  PlaylistResponse,
} from "@/models/api";
import { Playlist } from "@/models/data";
import { fetchData } from "./apiDataProvider";
import { mapPlaylist } from "@/utils/mappers";

const getPlaylists = async (): Promise<Playlist[]> => {
  const response: PlaylistResponse[] = await getPlaylistData("playlists");
  const tasks: Promise<PlaylistResponse[]>[] = response.map((x) => {
    return getPlaylistData("playlists/tracks", Number(x.id));
  });

  const playlists: PlaylistResponse[][] = await Promise.all(tasks);

  return playlists.flatMap((playlists: PlaylistResponse[]) => {
    return playlists.flatMap((playlist: PlaylistResponse) =>
      mapPlaylist(playlist)
    );
  });
};

const getPlaylistData = async (
  endpoint: string,
  playlistId?: number
): Promise<PlaylistResponse[]> => {
  const request: ApiRequest<PlaylistRequest> = {
    baseUrl: `${process.env.API_BASE_URL}/${endpoint}`,
    queryParams: {
      client_id: process.env.CLIENT_ID,
      user_id: process.env.USER_ID,
      id: playlistId,
    },
  };

  const response: ApiResponse<PlaylistResponse> = await fetchData(request);

  return response.results;
};

export { getPlaylists };
