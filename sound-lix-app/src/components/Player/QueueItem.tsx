"use client";

import SongInfo from "./SongInfo";
import { SongItemDetailsView } from "@/models/views";

const QueueItem = ({ song }: { song: SongItemDetailsView }) => {
  return (
    <div className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-700 px-2">
      <div className="flex items-center space-x-4 rtl:space-x-reverse w-full">
        <SongInfo song={song} size={{ img: 12, text: 12 }} />
        <div className="text-xs text-gray-400 mt-1 ml-auto">
          <span>{song.formatInput}</span>
        </div>
      </div>
    </div>
  );
};

export default QueueItem;
