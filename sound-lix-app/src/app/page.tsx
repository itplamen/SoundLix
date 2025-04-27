import { Playlist, Radio, Song } from "@/models/data";
import { getPlaylists } from "@/providers/playlistsProvider";
import PlaylistItemList from "@/components/Playlist/PlaylistItemList";

import BestChart from "@/components/Charts/BestChart";

import SongList from "@/components/Songs/SongList";
import ArtistList from "@/components/Artists/ArtistList";
import { getSongs } from "@/providers/songsProvider";
import getRadioList from "@/providers/dbDataProvider";
import RadioList from "@/components/Radio/RadioList";

const Home = async () => {
  const playlists: Playlist[] = await getPlaylists();
  const songs: Song[] = await getSongs();
  const radios: Radio[] = await getRadioList();

  return (
    <>
      <PlaylistItemList playlists={playlists} />
      <BestChart>
        <SongList heading={"Top Songs"} songs={songs} includeRanking={false} />
        <ArtistList />
      </BestChart>
      <RadioList radios={radios} />
    </>
  );
};

export default Home;
