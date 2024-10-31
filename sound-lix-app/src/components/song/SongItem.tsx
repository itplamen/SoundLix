import Image from "next/image";
import { Song } from "@/models/data";
import { Tooltip } from "flowbite-react";
import { formatSecondsToMinutes } from "@/utils/formatters";

type Props = {
  song: Song;
};

const SongItem = ({ song }: Props) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Image
            className="w-12 h-12 rounded-full"
            width={300}
            height={300}
            src={song.image}
            alt={`${song.name}`}
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {song.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {song.artist.name}
          </p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <div className="font-bold text-xs">
              {formatSecondsToMinutes(song.duration)}
            </div>
            <div className="w-4 h-4">
              <Tooltip
                content="Add to playlist"
                placement="top"
                className="text-xs"
              >
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                </svg>
              </Tooltip>
            </div>
            <div className="w-4 h-4">
              {song.downloadAllowed && (
                <Tooltip content="Download" placement="top" className="text-xs">
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
                      d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SongItem;
