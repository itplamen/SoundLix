import {
  ItemDetailsView,
  RoyaltyFreeMusicView,
  SongItemDetailsView,
} from "@/models/views";
import { mapRoyalty, mapSongView } from "@/utils/mappers";
import List from "../Lists/List";
import ListItem from "../Lists/ListItem";
import Icon from "../Icons/Icon";
import PlaylistIconType, {
  contnet as playlist,
} from "../Icons/Types/PlaylistIconType";
import DownloadIconType, {
  contnet as download,
} from "../Icons/Types/DownloadIconType";
import { RoyaltyFreeMusic } from "@/models/data";

type Props = {
  heading: string;
  songs: RoyaltyFreeMusic[];
};
const RoyaltyFreeMusicList = async ({ heading, songs }: Props) => {
  return (
    <List heading={heading}>
      {songs
        .map((song: RoyaltyFreeMusic) => mapRoyalty(song))
        .map((view: RoyaltyFreeMusicView) => (
          <ListItem
            key={view.id}
            item={view}
            url="song"
            badge={
              view.isNew && (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                  NEW
                </span>
              )
            }
            description={view.description}
          >
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

export default RoyaltyFreeMusicList;
