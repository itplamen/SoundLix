import { Song } from "@/app/data/models/entities";
import SongItem from "./SongItem";

type Props = {
  songs: Song[];
};

const SongItemList = ({ songs }: Props) => {
  return (
    <div className="p-8 sm:ml-64 mt-5">
      <div className="rounded-lg dark:border-gray-700">
        <div className="grid grid-cols-5 gap-4 mb-4">
          {songs.map((song: Song) => (
            <SongItem key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongItemList;
