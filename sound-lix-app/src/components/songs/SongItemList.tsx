import { Song } from "@/models/data";
import SongItem from "./SongItem";

type Props = {
  songs: Song[];
};

const SongItemList = ({ songs }: Props) => {
  return (
    <div className="p-8 sm:ml-44">
      <div className="grid rounded-lg dark:border-gray-700">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Top Songs
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {songs.map((song: Song) => (
                <SongItem key={song.id} song={song} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongItemList;
