import Image from "next/image";
import { SongItemDetailsView } from "@/models/views";

type Props = {
  song: SongItemDetailsView;
  size: {
    img: number;
    text: number;
  };
  children?: React.ReactNode;
};

const SongInfo = ({ song, size, children }: Props) => {
  return (
    <>
      <div
        className={`relative w-${size.img} h-${size.img} rounded-md overflow-hidden bg-gray-700 shadow-md flex-shrink-0 group`}
      >
        {song?.image ? (
          <Image
            src={song.image}
            alt="Track Cover"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-600 flex items-center justify-center">
            <span className="text-white text-xs">No Image</span>
          </div>
        )}
        {children}
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <p
          className={`text-[${size.text}px] font-semibold text-white truncate`}
        >
          {song.name || "No song selected"}
        </p>
        <small className="text-xs text-gray-400 truncate">
          {song.ownerName || "Select a song to play"}
        </small>
      </div>
    </>
  );
};

export default SongInfo;
