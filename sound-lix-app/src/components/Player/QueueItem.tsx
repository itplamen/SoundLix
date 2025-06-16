"use client";

import { BUTTON_ROUND, BUTTON_TEXT, COLOR } from "@/utils/constants";
import Icon from "../Icons/Icon";
import SongInfo from "./SongInfo";
import { SongItemDetailsView } from "@/models/views";
import PlayIconType from "../Icons/Types/PlayIconType";
import Button from "../Buttons/Button";
import PauseIconType from "../Icons/Types/PauseIconType";
import { MouseEventHandler } from "react";

type Props = {
  currentSong: SongItemDetailsView;
  song: SongItemDetailsView;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const QueueItem = ({ currentSong, song, onClick }: Props) => {
  return (
    <>
      <div className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-700 px-2">
        <div className="flex items-center space-x-4 rtl:space-x-reverse w-full">
          <SongInfo song={song} size={{ img: 12, text: 12 }}>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                bgColor={`${
                  song.id === currentSong.id && currentSong.isPlaying
                    ? COLOR.WHITE
                    : COLOR.LIGHT_GRAY
                }`}
                hoverColor={`${
                  song.id === currentSong.id && currentSong.isPlaying
                    ? COLOR.NONE
                    : COLOR.WHITE
                }`}
                rounded={BUTTON_ROUND.MAX}
                size={{ width: 8, height: 8 }}
                onClick={onClick}
              >
                <Icon color={COLOR.DARK_GRAY} size={4}>
                  {currentSong.isPlaying && currentSong.id == song.id ? (
                    <PauseIconType />
                  ) : (
                    <PlayIconType />
                  )}
                </Icon>
              </Button>
            </div>
          </SongInfo>

          <div className="text-xs text-gray-400 mt-1 ml-auto">
            <span>{song.formatInput}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueueItem;
