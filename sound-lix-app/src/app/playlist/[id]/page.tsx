import PlaylistDetails from "@/components/Playlist/PlaylistDetails";
import { Playlist } from "@/models/data";
import { getPlaylist } from "@/providers/playlistsProvider";

const PlaylistById = async ({ params }: { params: { id: number } }) => {
  const playlist: Playlist = await getPlaylist(params.id);

  return <PlaylistDetails playlist={playlist} />;
};

export default PlaylistById;
