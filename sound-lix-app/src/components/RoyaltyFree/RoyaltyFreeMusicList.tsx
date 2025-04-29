import { ItemDetailsView, SongItemDetailsView } from "@/models/views";
import { mapRoyalty, mapSongView } from "@/utils/mappers";
import List from "../Lists/List";
import ListItem from "../Lists/ListItem";
import Icon from "../Icons/Icon";
import PlaylistIconType, {
  contnet as playlist,
} from "../Icons/Types/PlaylistIconType";
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
        .map((view: ItemDetailsView) => (
          <ListItem key={view.id} item={view} url="song" includeRanking={false}>
            <Icon content={playlist}>
              <PlaylistIconType />
            </Icon>
          </ListItem>
        ))}
    </List>
  );
};

export default RoyaltyFreeMusicList;
