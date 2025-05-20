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
import { getCurrentSong, playSong } from "@/app/state/slices/audioPlayerSlice";
import { BUTTON_TEXT } from "@/utils/constants";

type Props = {
  item: ItemDetailsView;
  url: string;
  src?: string;
  description?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
};

const ListItem = ({ item, url, src, description, badge, children }: Props) => {
  const currentSong: SongItemDetailsView = useAppSelector(getCurrentSong);

  const dispatch = useAppDispatch();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      playSong({
        songs: [
          {
            ...item,
            src: src ?? "",
            downloadUrl: "",
            downloadAllowed: false,
            isPlaying: !currentSong.isPlaying,
            isSelected: true,
          },
        ],
      })
    );
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
                bgColor={"gray-300"}
                hoverColor={"white"}
                rounded={"rounded-full"}
                size={{ width: 10, height: 10 }}
                onClick={handleClick}
              >
                <Icon color={"gray-800"} size={6}>
                  {currentSong.isPlaying && item.id === currentSong.id ? (
                    <PauseIconType />
                  ) : (
                    <PlayIconType />
                  )}
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
