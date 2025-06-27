"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ItemDetailsView, SongItemDetailsView } from "@/models/views";
import PlayItem from "./PlayItem";

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
            <PlayItem item={item} songs={songs} />
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
