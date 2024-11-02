import { Playlist } from "@/models/data";
import { getPlaylists } from "@/providers/playlistsProvider";
import PlaylistItemList from "@/components/Playlist/PlaylistItemList";

import BestChart from "@/components/Charts/BestChart";

import SongList from "@/components/Songs/SongList";
import ArtistList from "@/components/Artists/ArtistList";

const Home = async () => {
  const playlists: Playlist[] = await getPlaylists();

  return (
    <>
      <PlaylistItemList playlists={playlists} />
      <BestChart>
        <SongList limit={10} />
        <ArtistList />
      </BestChart>
    </>
  );
};

export default Home;
