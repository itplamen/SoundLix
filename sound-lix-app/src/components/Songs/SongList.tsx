import { Genre, Song } from "@/models/data";
import { SongItemDetailsView } from "@/models/views";
import { getSongs } from "@/providers/songsProvider";
import { mapSongView } from "@/utils/mappers";
import List from "../Common/Lists/List";
import ListItem from "../Common/Lists/ListItem";
import Icon from "../Common/Icons/Icon";
import PlaylistIconType, {
  contnet as playlist,
} from "../Common/Icons/Types/PlaylistIconType";
import DownloadIconType, {
  contnet as download,
} from "../Common/Icons/Types/DownloadIconType";

type Props = {
  limit: number;
  lyrics?: boolean;
  genre?: Genre;
};

const SongList = async ({
  limit,
  lyrics = false,
  genre = undefined,
}: Props) => {
  const songs: Song[] = await getSongs(limit, lyrics, genre);

  return (
    <List heading="Top Songs">
      {songs
        .map((song: Song) => mapSongView(song))
        .map((view: SongItemDetailsView) => (
          <ListItem key={view.id} item={view}>
            <Icon content={playlist}>
              <PlaylistIconType />
            </Icon>
            <Icon content={download} display={view.downloadAllowed}>
              <DownloadIconType />
            </Icon>
          </ListItem>
        ))}
    </List>
  );
};

export default SongList;
