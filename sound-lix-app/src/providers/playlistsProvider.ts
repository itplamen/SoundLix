import {
  ApiRequest,
  ApiResponse,
  PlaylistRequest,
  PlaylistResponse,
  SongResponse,
} from "@/models/api";
import { Playlist } from "@/models/data";
import { fetchData } from "./apiDataProvider";

const getPlaylists = async (): Promise<Playlist[]> => {
  const response: PlaylistResponse[] = await getPlaylistData("playlists");
  const tasks: Promise<PlaylistResponse[]>[] = response.map((x) => {
    return getPlaylistData("playlists/tracks", Number(x.id));
  });

  const playlists: PlaylistResponse[][] = await Promise.all(tasks);

  return playlists.flatMap((playlists: PlaylistResponse[]) => {
    return playlists.flatMap((playlist: PlaylistResponse) => {
      return {
        id: Number(playlist.id),
        name: playlist.name,
        downloadUrl: playlist.zip,
        songs: playlist.tracks.map((track: SongResponse) => {
          return {
            id: Number(track.id),
            name: track.name,
            duration: track.duration,
            released: new Date(track.releasedate),
            audio: track.audio,
            downloadUrl: track.audiodownload,
            image: track.image,
            lyrics: track.lyrics,
            downloadAllowed: track.audiodownload_allowed,
            genre: "Ambient",
            artist: {
              id: Number(track.artist_id),
              name: track.artist_name,
            },
          };
        }),
      };
    });
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
