import { Playlist, Radio, RoyaltyFreeMusic, Song } from "@/models/data";
import { getPlaylists } from "@/providers/playlistsProvider";
import PlaylistItemList from "@/components/Playlist/PlaylistItemList";

import BestChart from "@/components/Charts/BestChart";

import SongList from "@/components/Songs/SongList";
import ArtistList from "@/components/Artists/ArtistList";
import { getSongs } from "@/providers/songsProvider";
import getRadioList from "@/providers/dbDataProvider";
import RadioList from "@/components/Radio/RadioList";
import { getRoyaltyFreeMusic } from "@/providers/royaltyFreeMusicProvider";
import RoyaltyFreeMusicList from "@/components/RoyaltyFree/RoyaltyFreeMusicList";
import { Toaster } from "react-hot-toast";

const Home = async () => {
  const playlists: Playlist[] = await getPlaylists();
  const songs: Song[] = await getSongs();
  const radios: Radio[] = await getRadioList();
  const music: RoyaltyFreeMusic[] = await getRoyaltyFreeMusic();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <PlaylistItemList playlists={playlists} />
      <BestChart>
        <SongList heading={"Top Songs"} songs={songs} />
        <ArtistList />
      </BestChart>

      <BestChart>
        <RoyaltyFreeMusicList
          songs={music}
          heading="Royalty Free Music for Videos"
        />
      </BestChart>
      <RadioList radios={radios} />
    </>
  );
};

export default Home;
