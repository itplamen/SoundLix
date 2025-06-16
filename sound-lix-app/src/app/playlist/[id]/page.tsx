import { getPlaylist } from "@/app/actions/playlistsAction";
import ItemDetails from "@/components/Common/ItemDetails";
import SongList from "@/components/Songs/SongList";
import { Playlist } from "@/models/data";

const PlaylistById = async ({ params }: { params: { id: number } }) => {
  const playlist: Playlist = await getPlaylist(params.id);
  const items: string[] = [`${playlist.songs.length} songs`];

  return (
    <ItemDetails
      title={"Playlist"}
      heading={playlist.name}
      subheading={{
        value: "Singles",
      }}
      date={playlist.created}
      additional={items.join(", ")}
      image={playlist.image}
      songs={playlist.songs}
    >
      <SongList heading={"Songs"} songs={playlist.songs} />
    </ItemDetails>
  );
};

export default PlaylistById;
