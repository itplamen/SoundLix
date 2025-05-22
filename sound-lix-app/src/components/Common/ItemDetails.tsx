"use client";

import { formatSecondsToHours } from "@/utils/formatters";
import { mapSongView, mapTotalDuration } from "@/utils/mappers";
import Image from "next/image";
import IndicatorList from "../Lists/IndicatorList";
import PlayIconType from "../Icons/Types/PlayIconType";
import { Song } from "@/models/data";
import Link from "next/link";
import Button from "../Buttons/Button";
import Icon from "../Icons/Icon";
import { BUTTON_ROUND, BUTTON_TEXT, COLOR } from "@/utils/constants";
import { useAppDispatch } from "@/app/state/hooks";
import { playSong } from "@/app/state/slices/audioPlayerSlice";
import { SongItemDetailsView } from "@/models/views";

type Props = {
  title: string;
  heading: string;
  subheading: {
    url?: string;
    value: string;
  };
  date: string;
  image: string;
  additional: string;
  songs: Song[];
  children: React.ReactNode;
};

const ItemDetails = ({
  title,
  heading,
  subheading,
  date,
  image,
  additional,
  songs,
  children,
}: Props) => {
  const items: string[] = [
    date,
    additional,
    formatSecondsToHours(mapTotalDuration(songs)),
  ];
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        role="status"
        className="space-y-8 mb-8 md:space-y-3 md:space-x-4 rtl:space-x-reverse md:flex "
      >
        <div className="flex items-center rounded-lg justify-center w-full h-56 bg-gray-300 rounded sm:w-72 dark:bg-gray-700">
          <Image
            className="w-72 h-56 rounded-lg"
            width={300}
            height={300}
            src={image}
            alt={`${heading}`}
          />
        </div>
        <div className="w-full">
          <div>{title}</div>
          <div className="mb-4 text-5xl">{heading}</div>
          <div className="mb-4 text-lg">
            {subheading.url ? (
              <Link href={subheading.url} className="hover:underline">
                {subheading.value}
              </Link>
            ) : (
              subheading.value
            )}
          </div>
          <div className="mb-4">
            <IndicatorList items={items} />
          </div>
          <div>
            <Button
              text={BUTTON_TEXT.PLAY}
              size={{ width: 24, height: 10 }}
              rounded={BUTTON_ROUND.LARGE}
              bgColor={COLOR.DARK_GRAY}
              hoverColor={COLOR.MEDIUM_GRAY}
              onClick={() =>
                dispatch(
                  playSong(
                    songs.map((song: Song) => {
                      return mapSongView(song);
                    })
                  )
                )
              }
            >
              <Icon size={6} color={COLOR.WHITE}>
                <PlayIconType />
              </Icon>
            </Button>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default ItemDetails;
