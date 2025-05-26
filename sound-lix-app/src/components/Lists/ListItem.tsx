"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ItemDetailsView, SongItemDetailsView } from "@/models/views";
import { useAppDispatch, useAppSelector } from "@/app/state/hooks";
import Button from "../Buttons/Button";
import Icon from "../Icons/Icon";
import PauseIconType from "../Icons/Types/PauseIconType";
import PlayIconType from "../Icons/Types/PlayIconType";
import {
  getCurrentSong,
  pauseSong,
  playSong,
} from "@/app/state/slices/audioPlayerSlice";
import { BUTTON_ROUND, BUTTON_TEXT, COLOR } from "@/utils/constants";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const haveSameIds = (
  first: SongItemDetailsView[],
  second: SongItemDetailsView[]
): boolean => {
  if (first.length !== first.length) return false;

  const firstIds = first.map((x) => x.id).sort();
  const secondIds = second.map((x) => x.id).sort();

  return firstIds.every((id, i) => id === secondIds[i]);
};

type Props = {
  item: ItemDetailsView;
  url: string;
  description?: string;
  badge?: React.ReactNode;
  songs: SongItemDetailsView[];
  children: React.ReactNode;
};

const ListItem = ({
  item,
  url,
  description,
  badge,
  songs,
  children,
}: Props) => {
  const dispatch = useAppDispatch();
  const currentSong: SongItemDetailsView = useAppSelector(getCurrentSong);
  const songQueue = useAppSelector((state) => state.audioPlayer.songs);
  const shouldPause =
    currentSong.isPlaying &&
    (item.id === currentSong.id || songs?.some((x) => x.id === currentSong.id));

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!shouldPause && songs.length > 1 && !haveSameIds(songs, songQueue)) {
      toast(`${songs.length} songs added to the queue`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: COLOR.WHITE,
        },
      });
    }

    dispatch(shouldPause ? pauseSong() : playSong(songs));
  };

  return (
    <Link href={`/${url}/${item.id}`}>
      <li className="p-4 py-3 sm:py-4 hover:bg-gray-200 hover:rounded-lg hover:cursor-pointer active:bg-green-700 relative group">
        <div className="flex items-center relative w-full">
          <div className="relative flex-shrink-0">
            <Image
              className="w-24 rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:opacity-70"
              width={300}
              height={300}
              src={item.image}
              alt={`${item.name}`}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                text={
                  currentSong.isPlaying && item.id === currentSong.id
                    ? BUTTON_TEXT.PAUSE
                    : BUTTON_TEXT.PLAY
                }
                bgColor={`${
                  item.id === currentSong.id && currentSong.isPlaying
                    ? COLOR.WHITE
                    : COLOR.LIGHT_GRAY
                }`}
                hoverColor={`${
                  item.id === currentSong.id && currentSong.isPlaying
                    ? COLOR.NONE
                    : COLOR.WHITE
                }`}
                rounded={BUTTON_ROUND.MAX}
                size={{ width: 10, height: 10 }}
                onClick={handleTogglePlay}
              >
                <Icon color={COLOR.DARK_GRAY} size={6}>
                  {shouldPause ? <PauseIconType /> : <PlayIconType />}
                </Icon>
              </Button>
            </div>
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {item.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {item.subheading}
            </p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-4">
              {badge}
              <div className="font-bold text-xs">{item.formatInput}</div>
              {children}
            </div>
          </div>
          {description && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-center px-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 overflow-hidden text-ellipsis line-clamp-2 w-96">
                {description}
              </p>
            </div>
          )}
        </div>
      </li>
    </Link>
  );
};

export default ListItem;
