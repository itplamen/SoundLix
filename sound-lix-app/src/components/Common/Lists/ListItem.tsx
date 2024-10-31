import React from "react";
import Image from "next/image";
import { ItemDetailsView } from "@/models/views";

type Props = {
  item: ItemDetailsView;
  children: React.ReactNode;
};
const ListItem = ({ item, children }: Props) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Image
            className="w-12 h-12 rounded-full"
            width={300}
            height={300}
            src={item.image}
            alt={`${item.name}`}
          />
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
  );
};

export default ListItem;
