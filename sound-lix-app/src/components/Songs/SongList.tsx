import { Song } from "@/models/data";
import { SongItemDetailsView } from "@/models/views";
import { mapSongView } from "@/utils/mappers";
import List from "../Lists/List";
import ListItem from "../Lists/ListItem";
import Icon from "../Icons/Icon";
import PlaylistIconType, {
  contnet as playlist,
} from "../Icons/Types/PlaylistIconType";
import DownloadIconType, {
  contnet as download,
} from "../Icons/Types/DownloadIconType";

type Props = {
  heading: string;
  songs: Song[];
  includeRanking: boolean;
};
const SongList = async ({ heading, songs, includeRanking }: Props) => {
  return (
    <List heading={heading}>
      {songs
        .map((song: Song) => mapSongView(song))
        .map((view: SongItemDetailsView) => (
          <ListItem key={view.id} item={view} includeRanking={includeRanking}>
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
