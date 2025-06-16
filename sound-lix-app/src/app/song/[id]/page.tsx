import { getSong } from "@/app/actions/songsAction";
import ItemDetails from "@/components/Common/ItemDetails";
import { Song } from "@/models/data";

const SongById = async ({ params }: { params: { id: number } }) => {
  const song: Song = await getSong(params.id);

  return (
    <ItemDetails
      title={"Song"}
      heading={song.name}
      subheading={{
        url: `/artist/${song.owner.id}`,
        value: song.owner.name,
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
