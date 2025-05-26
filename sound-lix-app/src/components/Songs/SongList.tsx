import { Song } from "@/models/data";
import { SongItemDetailsView } from "@/models/views";
import { mapSongView } from "@/utils/mappers";
import List from "../Lists/List";
import ListItem from "../Lists/ListItem";
import Icon from "../Icons/Icon";
import PlaylistIconType from "../Icons/Types/PlaylistIconType";
import DownloadIconType from "../Icons/Types/DownloadIconType";
import { BUTTON_ROUND, BUTTON_TEXT, COLOR } from "@/utils/constants";
import Button from "../Buttons/Button";

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
          <ListItem key={view.id} item={view} url="song" songs={[view]}>
            <Button
              text={BUTTON_TEXT.PLAYLIST}
              rounded={BUTTON_ROUND.LARGE}
              size={{ width: 6, height: 6 }}
              bgColor={COLOR.WHITE}
            >
              <Icon color={COLOR.DARK_GRAY}>
                <PlaylistIconType />
              </Icon>
            </Button>
            <Button
              text={BUTTON_TEXT.DOWNLOAD}
              rounded={BUTTON_ROUND.LARGE}
              size={{ width: 6, height: 6 }}
              bgColor={COLOR.WHITE}
            >
              <Icon color={COLOR.DARK_GRAY}>
                <DownloadIconType />
              </Icon>
            </Button>
          </ListItem>
        ))}
    </List>
  );
};

export default SongList;
