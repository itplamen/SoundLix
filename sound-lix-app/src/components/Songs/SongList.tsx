import { Song } from "@/models/data";
import { SongItemDetailsView } from "@/models/views";
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
