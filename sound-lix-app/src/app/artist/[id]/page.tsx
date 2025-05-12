import ItemDetails from "@/components/Common/ItemDetails";
import SongList from "@/components/Songs/SongList";
import { Artist } from "@/models/data";
import { getArtist } from "@/providers/artistsProvider";

const ArtistById = async ({ params }: { params: { id: number } }) => {
  const artist: Artist = await getArtist(params.id);

  return (
    <ItemDetails
      title={"Artist"}
      heading={artist.name}
      subheading={{
        value: "Singles",
      }}
      songs={artist.songs}
      additional={`${artist.songs.length} songs`}
      date={artist.joindate}
      image={artist.image}
    >
      <SongList heading={"Songs"} songs={artist.songs} />
    </ItemDetails>
  );
};

export default ArtistById;
