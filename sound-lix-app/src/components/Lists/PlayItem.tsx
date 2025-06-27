import { useAppDispatch, useAppSelector } from "@/app/state/hooks";
import {
  getCurrentSong,
  pauseSong,
  playSong,
} from "@/app/state/slices/audioPlayerSlice";
import { ItemDetailsView, SongItemDetailsView } from "@/models/views";
import { BUTTON_ROUND, BUTTON_TEXT, COLOR } from "@/utils/constants";
import toast from "react-hot-toast";
import Button from "../Buttons/Button";
import Icon from "../Icons/Icon";
import PauseIconType from "../Icons/Types/PauseIconType";
import PlayIconType from "../Icons/Types/PlayIconType";

type Props = {
  id: string;
  songs: SongItemDetailsView[];
};

const PlayItem = ({ id, songs }: Props) => {
  const dispatch = useAppDispatch();
  const currentSong: SongItemDetailsView = useAppSelector(getCurrentSong);
  const songQueue = useAppSelector((state) => state.audioPlayer.songs);
  const shouldPause =
    currentSong.isPlaying &&
    (id === currentSong.id || songs?.some((x) => x.id === currentSong.id));

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

  const haveSameIds = (
    first: SongItemDetailsView[],
    second: SongItemDetailsView[]
  ): boolean => {
    if (first.length !== first.length) return false;

    const firstIds = first.map((x) => x.id).sort();
    const secondIds = second.map((x) => x.id).sort();

    return firstIds.every((id, i) => id === secondIds[i]);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Button
        text={
          currentSong.isPlaying && id === currentSong.id
            ? BUTTON_TEXT.PAUSE
            : BUTTON_TEXT.PLAY
        }
        bgColor={`${
          id === currentSong.id && currentSong.isPlaying
            ? COLOR.WHITE
            : COLOR.LIGHT_GRAY
        }`}
        hoverColor={`${
          id === currentSong.id && currentSong.isPlaying
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
  );
};

export default PlayItem;
