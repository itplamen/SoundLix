import { Playlist, Song } from "@/models/data";
import { getPlaylists } from "@/providers/playlistsProvider";
import PlaylistItemList from "@/components/Playlist/PlaylistItemList";

import BestChart from "@/components/Charts/BestChart";

import SongList from "@/components/Songs/SongList";
import ArtistList from "@/components/Artists/ArtistList";
import { getSongs } from "@/providers/songsProvider";

const Home = async () => {
  const playlists: Playlist[] = await getPlaylists();
  const songs: Song[] = await getSongs();

  return (
    <>
      <PlaylistItemList playlists={playlists} />
      <BestChart>
        <SongList heading={"Top Songs"} songs={songs} includeRanking={false} />
        <ArtistList />
      </BestChart>
    </>
  );
};

export default Home;
