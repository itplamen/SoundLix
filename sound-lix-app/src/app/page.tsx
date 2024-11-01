import { Artist, Playlist, Song } from "@/models/data";
import { getPlaylists } from "@/providers/playlistsProvider";
import PlaylistItemList from "@/components/Playlist/PlaylistItemList";
import { getSongs } from "@/providers/songsProvider";
import getArtists from "@/providers/artistsProvider";
import BestChart from "@/components/Charts/BestChart";
import { mapArtistView, mapSongView } from "@/utils/mappers";
import List from "@/components/Common/Lists/List";
import PlaylistIconType, {
  contnet as playlistIconTypeContent,
} from "@/components/Common/Icons/Types/PlaylistIconType";
import DownloadIconType, {
  contnet as downloadIconTypeContent,
} from "@/components/Common/Icons/Types/DownloadIconType";
import WebsiteIconType, {
  contnet as websiteIconTypeContent,
} from "@/components/Common/Icons/Types/WebsiteIconType";
import Icon from "@/components/Common/Icons/Icon";
import { ItemDetailsView, SongItemDetailsView } from "@/models/views";
import ListItem from "@/components/Common/Lists/ListItem";

const Home = async () => {
  const playlists: Playlist[] = await getPlaylists();
  const songs: Song[] = await getSongs();
  const artists: Artist[] = await getArtists();

  return (
    <>
      <PlaylistItemList playlists={playlists} />
      <BestChart>
        <List heading="Top Songs">
          {songs
            .map((song: Song) => mapSongView(song))
            .map((view: SongItemDetailsView) => (
              <ListItem key={view.id} item={view}>
                <Icon content={playlistIconTypeContent}>
                  <PlaylistIconType />
                </Icon>
                <Icon
                  content={downloadIconTypeContent}
                  display={view.downloadAllowed}
                >
                  <DownloadIconType />
                </Icon>
              </ListItem>
            ))}
        </List>
        <List heading="Hot Artists">
          {artists
            .map((artist: Artist) => mapArtistView(artist))
            .map((view: ItemDetailsView) => (
              <ListItem key={view.id} item={view}>
                <Icon content={websiteIconTypeContent}>
                  <WebsiteIconType />
                </Icon>
              </ListItem>
            ))}
        </List>
      </BestChart>
    </>
  );
};

export default Home;
