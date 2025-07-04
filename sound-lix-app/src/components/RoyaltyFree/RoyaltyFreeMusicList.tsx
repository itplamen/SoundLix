import { RoyaltyFreeMusicView } from "@/models/views";
import { mapRoyalty } from "@/utils/mappers";
import List from "../Lists/List";
import ListItem from "../Lists/ListItem";
import Icon from "../Icons/Icon";
import PlaylistIconType from "../Icons/Types/PlaylistIconType";
import DownloadIconType from "../Icons/Types/DownloadIconType";

import { RoyaltyFreeMusic } from "@/models/data";

type Props = {
  heading: string;
  songs: RoyaltyFreeMusic[];
};

const RoyaltyFreeMusicList = async ({ heading, songs }: Props) => {
  return (
    <List heading={heading}>
      {songs.map((song: RoyaltyFreeMusic) => {
        const view: RoyaltyFreeMusicView = mapRoyalty(song);

        return (
          <ListItem
            key={view.id}
            item={view}
            url="song"
            songs={[view]}
            badge={
              view.isNew && (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                  NEW
                </span>
              )
            }
            description={view.description}
          >
            <Icon color={"gray-800"}>
              <PlaylistIconType />
            </Icon>
            <Icon display={view.downloadAllowed} color={"gray-800"}>
              <DownloadIconType />
            </Icon>
          </ListItem>
        );
      })}
    </List>
  );
};

export default RoyaltyFreeMusicList;
