import { Playlist } from "@/models/data";
import Image from "next/image";
import SongList from "../Songs/SongList";
import { formatSecondsToHours } from "@/utils/formatters";
import { mapTotalDuration } from "@/utils/mappers";
import IndicatorList from "../Lists/IndicatorList";
import Button from "../Buttons/Button";
import PlayIconType from "../Icons/Types/PlayIconType";
import DownloadIconType from "../Icons/Types/DownloadIconType";

const PlaylistDetails = ({ playlist }: { playlist: Playlist }) => {
  const items: string[] = [
    playlist.created,
    `${playlist.songs.length} songs`,
    formatSecondsToHours(mapTotalDuration(playlist.songs)),
  ];
  return (
    <>
      <div
        role="status"
        className="space-y-8 mb-8 md:space-y-3 md:space-x-4 rtl:space-x-reverse md:flex "
      >
        <div className="flex items-center rounded-lg justify-center w-full h-48 bg-gray-300 rounded sm:w-72 dark:bg-gray-700">
          <Image
            className="w-72 h-48 rounded-lg"
            width={300}
            height={300}
            src={playlist.image}
            alt={`${playlist.name}`}
          />
        </div>
        <div className="w-full">
          <div>Playlist</div>
          <div className="mb-4 text-5xl">{playlist.name}</div>
          <div className="mb-4">
            <IndicatorList items={items} />
          </div>
          <div>
            <Button text="Download">
              <DownloadIconType />
            </Button>
            <Button text="Play">
              <PlayIconType />
            </Button>
          </div>
        </div>
      </div>
      <SongList
        heading={"Songs"}
        songs={playlist.songs}
        includeRanking={true}
      />
    </>
  );
};

export default PlaylistDetails;
