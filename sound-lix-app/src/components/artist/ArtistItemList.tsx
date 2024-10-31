import { Artist } from "@/models/data";
import ArtistItem from "./ArtistItem";

type Props = {
  artists: Artist[];
};

const ArtistItemList = ({ artists }: Props) => {
  return (
    <>
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 max-w-full max-h-screen overflow-auto">
        <div className="h-[75vh]">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Hot Artists
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {artists.map((artist: Artist) => (
                <ArtistItem key={artist.id} artist={artist} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 max-w-full max-h-screen overflow-auto">
        <div className="h-[75vh]"></div>
      </div>
    </>
  );
};

export default ArtistItemList;
