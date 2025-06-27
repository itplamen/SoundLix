"use client";

import PlayItem from "../Lists/PlayItem";
import { SongItemDetailsView } from "@/models/views";

type Props = {
  radio: SongItemDetailsView;
};

const RadioItem = ({ radio }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 relative group cursor-pointer">
      <a
        className="hexagon-content relative block"
        href='/catalog?genre=["ambient/new age"]'
      >
        <svg
          width="168"
          height="186"
          viewBox="0 0 168 186"
          fill="none"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <pattern
              id={radio.id}
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href={radio.image}
                width="100%"
                height="100%"
                className="w-72 h-48 rounded-lg"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
          <path
            d="M95.9073 182.196C88.529 186.412 79.4711 186.412 72.0927 182.196L12.0927 147.91C4.61488 143.637 0 135.685 0 127.072V58.9277C0 50.3152 4.61488 42.3629 12.0927 38.0899L72.0927 3.80419C79.471 -0.412034 88.5289 -0.412035 95.9073 3.80419L155.907 38.0899C163.385 42.3629 168 50.3152 168 58.9277V127.072C168 135.685 163.385 143.637 155.907 147.91L95.9073 182.196Z"
            fill={`url(#${radio.id})`}
          />
        </svg>

        <PlayItem item={radio} songs={[radio]} />

        <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-sm pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
          {radio.name}
        </div>
      </a>
    </div>
  );
};

export default RadioItem;
