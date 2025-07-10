"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ItemDetailsView } from "@/models/views";
import { Song } from "@/models/data";
import PlayItem from "./PlayItem";
import { mapSongView } from "@/utils/mappers";

type Props = {
  item: ItemDetailsView;
  url: string;
  description?: string;
  badge?: React.ReactNode;
  songs: Song[];
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
  const songViews = songs.map(mapSongView);

  return (
    <li className="p-4 py-3 sm:py-4 list-none group">
      <Link href={`/${url}/${item.id}`} className="block">
        <div className="flex items-center w-full gap-4 relative">
          <div className="relative w-24 h-24 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-70">
            <Image
              className="rounded-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={item.image}
              alt={item.name}
              fill
              sizes="96px"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <PlayItem id={item.id} songs={songViews} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {item.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {item.subheading}
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            {badge}
            <div className="font-bold text-xs">{item.formatInput}</div>
            {children}
          </div>

          {description && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-center px-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 overflow-hidden text-ellipsis line-clamp-2 w-96">
                {description}
              </p>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default ListItem;
