import Image from "next/image";
import { Song } from "@/app/data/models/entities";

type Props = {
  song: Song;
};

const SongItem = ({ song }: Props) => {
  return (
    <div className="flex items-center justify-center w-48 h-44 rounded bg-bg-transparent mb-8 drop-shadow-lg">
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
        <Image
          className="h-auto max-w-full rounded-lg"
          alt={`${song.artist} - ${song.title}`}
          width={200}
          height={200}
          src={`https://img.youtube.com/vi/${song.url}/hqdefault.jpg`}
        />

        <div className="p-2 w-48 h-18">
          <h6 className="font-bold tracking-tight break-words text-sm truncate">
            {song.title}
          </h6>
          <small className="text-gray-700 dark:text-gray-400 text-xs">
            {song.artist}
          </small>
        </div>
      </div>
    </div>
  );
};

export default SongItem;
