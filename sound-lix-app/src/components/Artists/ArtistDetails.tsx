import { Artist } from "@/models/data";
import { formatSecondsToHours } from "@/utils/formatters";
import { mapTotalDuration } from "@/utils/mappers";
import Image from "next/image";
import IndicatorList from "../Lists/IndicatorList";
import Button from "../Buttons/Button";
import PlayIconType from "../Icons/Types/PlayIconType";
import SongList from "../Songs/SongList";

const ArtistDetails = ({ artist }: { artist: Artist }) => {
  const items: string[] = [
    artist.joindate,
    `${artist.songs.length} songs`,
    formatSecondsToHours(mapTotalDuration(artist.songs)),
    artist.website,
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
            src={artist.image}
            alt={`${artist.name}`}
          />
        </div>
        <div className="w-full">
          <div>Artist</div>
          <div className="mb-4 text-5xl">{artist.name}</div>
          <div className="mb-4">
            <IndicatorList items={items} />
          </div>
          <div>
            <Button text="Play">
              <PlayIconType />
            </Button>
          </div>
        </div>
      </div>
      <SongList heading={"Songs"} songs={artist.songs} includeRanking={true} />
    </>
  );
};

export default ArtistDetails;
