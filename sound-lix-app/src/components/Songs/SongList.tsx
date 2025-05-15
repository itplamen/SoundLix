import { Song } from "@/models/data";
import { SongItemDetailsView } from "@/models/views";
import { mapSongView } from "@/utils/mappers";
import List from "../Lists/List";
import ListItem from "../Lists/ListItem";
import Icon from "../Icons/Icon";
import PlaylistIconType from "../Icons/Types/PlaylistIconType";
import DownloadIconType from "../Icons/Types/DownloadIconType";
import { playlist, download } from "../Icons/Types/IconTypeContent";

type Props = {
  heading: string;
  songs: Song[];
};
const SongList = async ({ heading, songs }: Props) => {
  return (
    <List heading={heading}>
      {songs
        .map((song: Song) => mapSongView(song))
        .map((view: SongItemDetailsView) => (
          <ListItem key={view.id} item={view} url="song" src={view.src}>
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
