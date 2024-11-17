import { Artist } from "@/models/data";
import { getArtists } from "@/providers/artistsProvider";
import List from "../Lists/List";
import ListItem from "../Lists/ListItem";
import { ItemDetailsView } from "@/models/views";
import { mapArtistView } from "@/utils/mappers";
import Icon from "../Icons/Icon";
import WebsiteIconType, { contnet } from "../Icons/Types/WebsiteIconType";

const ArtistList = async () => {
  const artists: Artist[] = await getArtists();

  return (
    <List heading="Hot Artists">
      {artists
        .map((artist: Artist) => mapArtistView(artist))
        .map((view: ItemDetailsView) => (
          <ListItem key={view.id} item={view}>
            <Icon content={contnet}>
              <WebsiteIconType />
            </Icon>
          </ListItem>
        ))}
    </List>
  );
};

export default ArtistList;
