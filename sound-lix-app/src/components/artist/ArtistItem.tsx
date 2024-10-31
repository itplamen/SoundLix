import Image from "next/image";
import { Artist, Song } from "@/models/data";
import { formatSecondsToHours } from "@/utils/formatters";
import { Tooltip } from "flowbite-react";

type Props = {
  artist: Artist;
};

const ArtistItem = ({ artist }: Props) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Image
            className="w-12 h-12 rounded-full"
            width={300}
            height={300}
            src={artist.image}
            alt={`${artist.name}`}
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {artist.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {artist.songs.length} songs
          </p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <div className="font-bold text-xs">
              {formatSecondsToHours(
                artist.songs
                  .map((song: Song) => song.duration)
                  .reduce((prev, next) => prev + next, 0)
              )}
            </div>
            <div className="w-4 h-4">
              <Tooltip content="Website" placement="top" className="text-xs">
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ArtistItem;
