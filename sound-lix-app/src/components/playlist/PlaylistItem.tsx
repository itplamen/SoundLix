"use client";

import Image from "next/image";
import { Playlist } from "@/models/data";
import Link from "next/link";
import PlayItem from "../Lists/PlayItem";
import { mapSongView } from "@/utils/mappers";

type Props = {
  playlist: Playlist;
};

const PlaylistItem = ({ playlist }: Props) => {
  const songs = playlist.songs.map(mapSongView);

  return (
    <Link href={`/playlist/${playlist.id}`}>
      <div className="group w-42">
        <div className="relative h-48 rounded-lg overflow-hidden cursor-pointer shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-70">
          <Image
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            fill
            src={playlist.image}
            alt={`Playlist ${playlist.name}`}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <PlayItem id={playlist.id} songs={songs} />
          </div>
        </div>

        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {playlist.name}
        </figcaption>
      </div>
    </Link>
  );
};

export default PlaylistItem;
