import React from "react";
import Image from "next/image";
import { ItemDetailsView } from "@/models/views";
import Link from "next/link";

type Props = {
  item: ItemDetailsView;
  children: React.ReactNode;
  includeRanking: boolean;
};
const ListItem = ({ item, children, includeRanking }: Props) => {
  return (
    <Link href={"/artist/" + item.id}>
      <li className="p-4 py-3 sm:py-4 hover:bg-gray-200 hover:rounded-lg hover:cursor-pointer active:bg-green-700 relative group">
        <div className="flex items-center">
          <div>{includeRanking && item.rank}</div>
          <div
            className={`relative flex-shrink-0 ${includeRanking ? "ms-4" : ""}`}
          >
            <Image
              className="w-24 rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:opacity-70"
              width={300}
              height={300}
              src={item.image}
              alt={`${item.name}`}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                stroke="currentColor"
                fill="white"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="40"
                width="40"
                xmlns="http://www.w3.org/2000/svg"
                className="bg-black rounded-full"
              >
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z"></path>
              </svg>
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
              <div className="font-bold text-xs">
                {item.format(item.formatInput)}
              </div>
              {children}
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default ListItem;
