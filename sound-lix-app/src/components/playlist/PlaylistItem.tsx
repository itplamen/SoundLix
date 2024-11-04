import Image from "next/image";
import { Playlist } from "@/models/data";

type Props = {
  playlist: Playlist;
};
const PlaylistItem = ({ playlist }: Props) => {
  return (
    <figure className="max-w-lg">
      <Image
        className="rounded-t-lg h-48 w-42"
        width={300}
        height={300}
        src={playlist.image}
        alt={`Playlist ${playlist.name}`}
      />
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
        {playlist.name}
      </figcaption>
    </figure>
  );
};

export default PlaylistItem;
