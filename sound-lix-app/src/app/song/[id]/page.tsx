import ItemDetails from "@/components/Common/ItemDetails";
import { Song } from "@/models/data";
import { getSong } from "@/providers/songsProvider";

const SongById = async ({ params }: { params: { id: number } }) => {
  const song: Song = await getSong(params.id);

  return (
    <ItemDetails
      title={"Song"}
      heading={song.name}
      subheading={{
        url: `/artist/${song.artist.id}`,
        value: song.artist.name,
      }}
      date={song.released}
      additional={song.genres.join(", ")}
      image={song.image}
      songs={[song]}
    >
      <pre className="whitespace-pre-wrap text-sm">{song.lyrics}</pre>{" "}
    </ItemDetails>
  );
};

export default SongById;
