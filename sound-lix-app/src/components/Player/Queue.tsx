"use client";

import { SongItemDetailsView } from "@/models/views";
import QueueItem from "./QueueItem";
import Separator from "../Common/Separator";

type Props = {
  currentSong: SongItemDetailsView;
  queue: SongItemDetailsView[];
};

const Queue = ({ currentSong, queue }: Props) => {
  return (
    <div className="absolute">
      <div className="absolute bottom-10 mb-2 w-72 bg-gray-800 text-white  rounded-lg shadow-md">
        <div className="px-3 py-2 bg-gray-900 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-200 dark:text-white">Queue</h3>
        </div>

        <ul className="max-h-64 overflow-y-auto max-w-md  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
          <Separator text="Now playing" />
          <li key={currentSong.id}>
            <QueueItem song={currentSong} />
          </li>
          <Separator text="Next from" />
          {queue
            .filter((x) => x.id !== currentSong.id)
            .map((song) => (
              <li key={song.id}>
                <QueueItem song={song} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Queue;
