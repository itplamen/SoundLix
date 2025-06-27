"use client";

import Image from "next/image";
import { Playlist, Song } from "@/models/data";
import Link from "next/link";
import PlayItem from "../Lists/PlayItem";
import { mapSongView } from "@/utils/mappers";

type Props = {
  playlist: Playlist;
};
const PlaylistItem = ({ playlist }: Props) => {
  return (
    <Link
      href={"/playlist/" + playlist.id}
      className="hover:rounded-lg hover:cursor-pointer relative group"
    >
      <figure className="max-w-lg">
        <Image
          className="rounded-lg h-48 w-42 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-70"
          width={300}
          height={300}
          src={playlist.image}
          alt={`Playlist ${playlist.name}`}
        />
        <PlayItem
          id={playlist.id}
          songs={playlist.songs.map((song: Song) => mapSongView(song))}
        />
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {playlist.name}
        </figcaption>
      </figure>
    </Link>
  );
};

export default PlaylistItem;
