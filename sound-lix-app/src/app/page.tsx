import { Artist, Playlist, Radio, Song } from "@/models/data";

import PlaylistItemList from "@/components/Playlist/PlaylistItemList";

import BestChart from "@/components/Charts/BestChart";

import SongList from "@/components/Songs/SongList";
import ArtistList from "@/components/Artists/ArtistList";
import RadioList from "@/components/Radio/RadioList";

import { Toaster } from "react-hot-toast";
import { getPlaylists } from "./actions/playlistsAction";
import { getSongs } from "./actions/songsAction";
import { getRadioList } from "./actions/dbAction";
import { getRoyaltyFreeMusic } from "./actions/royaltyFreeMusicAction";
import { getArtists } from "./actions/artistsAction";

const Home = async () => {
  const playlists: Playlist[] = await getPlaylists();
  const songs: Song[] = await getSongs();
  const artists: Artist[] = await getArtists();
  const radios: Radio[] = await getRadioList();
  const royaltyFreeMusic: Song[] = await getRoyaltyFreeMusic();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <PlaylistItemList playlists={playlists} />
      <BestChart>
        <SongList heading={"Top Songs"} songs={songs} />
        <ArtistList heading={"Hot Artists"} artists={artists} />
      </BestChart>

      <BestChart>
        <SongList
          songs={royaltyFreeMusic}
          heading="Royalty Free Music for Videos"
        />
      </BestChart>
      <RadioList radios={radios} />
    </>
  );
};

export default Home;
