"use client";

import { SongItemDetailsView } from "@/models/views";
import QueueItem from "./QueueItem";
import Separator from "../Common/Separator";
import { useAppDispatch, useAppSelector } from "@/app/state/hooks";
import {
  pauseSong,
  playNextSong,
  playSong,
} from "@/app/state/slices/audioPlayerSlice";

type Props = {
  currentSong: SongItemDetailsView;
  queue: SongItemDetailsView[];
};

const Queue = ({ currentSong, queue }: Props) => {
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector(
    (state) => state.audioPlayer.currentIndex
  );

  return (
    <div className="absolute">
      <div className="absolute bottom-10 mb-2 w-72 bg-gray-800 text-white  rounded-lg shadow-md">
        <div className="px-3 py-2 bg-gray-900 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-200 dark:text-white">Queue</h3>
        </div>

        <div className="max-h-64 overflow-y-auto max-w-md scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
          <Separator text="Now playing" />
          <div key={currentSong.id} className="group">
            <QueueItem
              currentSong={currentSong}
              song={currentSong}
              onClick={() =>
                dispatch(
                  currentSong.isPlaying ? pauseSong() : playSong([currentSong])
                )
              }
            />
          </div>
          {queue.length > 1 && (
            <>
              <Separator text={`Next from ${currentSong.ownerName}`} />
              <ul>
                {queue
                  .filter(
                    (song, index) =>
                      song.id !== currentSong.id && index > currentIndex
                  )
                  .map((song) => (
                    <li key={song.id} className="group">
                      <QueueItem
                        currentSong={currentSong}
                        song={song}
                        onClick={() => dispatch(playNextSong(song))}
                      />
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queue;
