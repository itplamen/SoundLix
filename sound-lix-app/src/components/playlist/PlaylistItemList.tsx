import { Playlist } from "@/models/data";
import PlaylistItem from "./PlaylistItem";

type Props = {
  playlists: Playlist[];
};

const PlaylistItemList = ({ playlists }: Props) => {
  return (
    <>
      <div className="rounded-lg dark:border-gray-700 gap-4 mb-4">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 max-w-full max-h-screen overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Suggested Playlists
            </h5>
          </div>
          <p className="text-sm text-gray-500">
            Immerse yourself in our collection of fresh and captivating
            playlists.
          </p>
          <hr className="h-px my-4 w-1/3 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="grid rounded-lg dark:border-gray-700 grid-cols-7 gap-4 mb-4">
            {playlists.map((x) => (
              <PlaylistItem key={x.id} playlist={x} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistItemList;
