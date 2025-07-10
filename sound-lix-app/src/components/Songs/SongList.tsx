"use client";

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
import { useAppDispatch, useAppSelector } from "@/app/state/hooks";
import { setAuthModal } from "@/app/state/slices/notificationSlice";

type Props = {
  heading: string;
  songs: Song[];
};
const SongList = ({ heading, songs }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authentication.user);

  const handleClick = (
    e: React.MouseEvent,
    image: string,
    isDownload: boolean
  ) => {
    e.preventDefault();
    if (user.role === "Guest") {
      dispatch(setAuthModal({ show: true, image, isDownload }));
    }
  };

  return (
    <List heading={heading}>
      {songs.map((song: Song) => {
        const view = mapSongView(song);
        return (
          <ListItem
            key={view.id}
            item={view}
            url="song"
            songs={[song]}
            badge={
              view.isNew && (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                  NEW
                </span>
              )
            }
            description={view.description}
          >
            <Button
              text={BUTTON_TEXT.PLAYLIST}
              rounded={BUTTON_ROUND.LARGE}
              size={{ width: 6, height: 6 }}
              bgColor={COLOR.WHITE}
              onClick={(e) => handleClick(e, view.image, false)}
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
              onClick={(e) => handleClick(e, view.image, true)}
            >
              <Icon color={COLOR.DARK_GRAY}>
                <DownloadIconType />
              </Icon>
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SongList;
