import ArtistDetails from "@/components/Artists/ArtistDetails";
import { Artist } from "@/models/data";
import { getArtist } from "@/providers/artistsProvider";

const ArtistById = async ({ params }: { params: { id: number } }) => {
  const artist: Artist = await getArtist(params.id);

  return <ArtistDetails artist={artist} />;
};

export default ArtistById;
