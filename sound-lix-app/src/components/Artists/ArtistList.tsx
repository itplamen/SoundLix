import { Artist } from "@/models/data";
import { getArtists } from "@/providers/artistsProvider";
import List from "../Lists/List";
import ListItem from "../Lists/ListItem";
import { ArtistItemDetailsView } from "@/models/views";
import { mapArtistView } from "@/utils/mappers";
import Icon from "../Icons/Icon";
import WebsiteIconType from "../Icons/Types/WebsiteIconType";
import { BUTTON_ROUND, BUTTON_TEXT, COLOR } from "@/utils/constants";
import Button from "../Buttons/Button";

const ArtistList = async () => {
  const artists: Artist[] = await getArtists();

  return (
    <List heading="Hot Artists">
      {artists
        .map((artist: Artist) => mapArtistView(artist))
        .map((view: ArtistItemDetailsView) => (
          <ListItem key={view.id} item={view} url="artist" songs={view.songs}>
            <Button
              text={BUTTON_TEXT.WEBSITE}
              rounded={BUTTON_ROUND.LARGE}
              size={{ width: 6, height: 6 }}
              bgColor={COLOR.WHITE}
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
