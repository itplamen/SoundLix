import { Artist } from "@/models/data";
import { getArtists } from "@/providers/artistsProvider";
import List from "../Lists/List";
import ListItem from "../Lists/ListItem";
import { ItemDetailsView } from "@/models/views";
import { mapArtistView } from "@/utils/mappers";
import Icon from "../Icons/Icon";
import WebsiteIconType from "../Icons/Types/WebsiteIconType";
import { BUTTON_TEXT } from "@/utils/constants";

const ArtistList = async () => {
  const artists: Artist[] = await getArtists();

  return (
    <List heading="Hot Artists">
      {artists
        .map((artist: Artist) => mapArtistView(artist))
        .map((view: ItemDetailsView) => (
          <ListItem key={view.id} item={view} url="artist">
            <Icon content={BUTTON_TEXT.WEBSITE} color={"gray-800"}>
              <WebsiteIconType />
            </Icon>
          </ListItem>
        ))}
    </List>
  );
};

export default ArtistList;
