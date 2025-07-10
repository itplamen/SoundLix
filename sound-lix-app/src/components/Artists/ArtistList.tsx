"use client";

import { Artist } from "@/models/data";
import List from "../Lists/List";
import ListItem from "../Lists/ListItem";
import { ArtistItemDetailsView } from "@/models/views";
import { mapArtistView } from "@/utils/mappers";
import Icon from "../Icons/Icon";
import WebsiteIconType from "../Icons/Types/WebsiteIconType";
import {
  AUTH_MODAL_TYPE,
  AuthModalTypeOption,
  BUTTON_ROUND,
  BUTTON_TEXT,
  COLOR,
} from "@/utils/constants";
import Button from "../Buttons/Button";
import { useAppDispatch, useAppSelector } from "@/app/state/hooks";
import { setAuthModal } from "@/app/state/slices/notificationSlice";

type Props = {
  heading: string;
  artists: Artist[];
};

const ArtistList = ({ heading, artists }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authentication.user);

  const handleClick = (
    e: React.MouseEvent,
    image: string,
    type: AuthModalTypeOption
  ) => {
    e.preventDefault();
    if (user.role === "Guest") {
      dispatch(setAuthModal({ show: true, image, type }));
    }
  };
  return (
    <List heading={heading}>
      {artists
        .map((artist: Artist) => mapArtistView(artist))
        .map((view: ArtistItemDetailsView) => (
          <ListItem key={view.id} item={view} url="artist" songs={view.songs}>
            <Button
              text={BUTTON_TEXT.WEBSITE}
              rounded={BUTTON_ROUND.LARGE}
              size={{ width: 6, height: 6 }}
              bgColor={COLOR.WHITE}
              onClick={(e) =>
                handleClick(e, view.image, AUTH_MODAL_TYPE.DETAILS)
              }
            >
              <Icon color={COLOR.DARK_GRAY}>
                <WebsiteIconType />
              </Icon>
            </Button>
          </ListItem>
        ))}
    </List>
  );
};

export default ArtistList;
