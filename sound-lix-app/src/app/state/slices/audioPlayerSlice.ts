import { SongItemDetailsView } from "@/models/views";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { VOLUME_CONFIG } from "@/utils/constants";

interface AudioPlayerState {
  id: string;
  songs: SongItemDetailsView[];
  currentIndex: number;
  repeatSong: boolean;
  volume: number;
  time: {
    duration: number;
    currentTime: number;
  };
}

const initialState: AudioPlayerState = {
  id: "",
  songs: [],
  currentIndex: -1,
  repeatSong: false,
  volume: VOLUME_CONFIG.MAX,
  time: {
    duration: 0,
    currentTime: 0,
  },
};

const changeSong = (
  state: AudioPlayerState,
  direction: "next" | "prev",
  payload?: SongItemDetailsView | undefined
) => {
  if (state.currentIndex === -1) return;

  const offset = direction === "next" ? 1 : -1;
  const newIndex = payload
    ? state.songs.findIndex((x) => x.id === payload?.id)
    : state.currentIndex + offset;

  if (newIndex >= 0 && newIndex < state.songs.length) {
    state.currentIndex = newIndex;
    state.time = {
      currentTime: 0,
      duration: 0,
    };
    state.songs = state.songs.map((song, index) => ({
      ...song,
      isPlaying: state.currentIndex === index,
    }));
  }
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    playSong: (
      state,
      action: PayloadAction<
        { id: string; songs: SongItemDetailsView[] } | undefined
      >
    ) => {
      if (
        action?.payload &&
        !action.payload.songs.some(
          (x) => x.id === state.songs[state.currentIndex].id
        )
      ) {
        state.time = {
          currentTime: 0,
          duration: 0,
        };
      }

      state.currentIndex =
        state.id === action.payload?.id ? state.currentIndex : 0;
      state.id = action.payload?.id ?? "";
      state.songs = (action?.payload?.songs || state.songs).map(
        (song: SongItemDetailsView, index: number) => ({
          ...song,
          isPlaying: state.currentIndex === index,
        })
      );
    },
    pauseSong: (state) => {
      state.songs = state.songs.map((song: SongItemDetailsView) => ({
        ...song,
        isPlaying: false,
      }));
    },
    playNextSong: (
      state,
      action: PayloadAction<SongItemDetailsView | undefined>
    ) => {
      changeSong(state, "next", action.payload);
    },
    playPrevSong: (state) => {
      changeSong(state, "prev");
    },
    toggleRepeatSong: (state) => {
      state.repeatSong = !state.repeatSong;
    },
    changeVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    changeTime: (
      state,
      action: PayloadAction<{
        duration: number;
        currentTime: number;
      }>
    ) => {
      state.time = action.payload;
    },
  },
});

export const {
  playSong,
  pauseSong,
  playNextSong,
  playPrevSong,
  toggleRepeatSong,
  changeVolume,
  changeTime,
} = audioPlayerSlice.actions;
export const getCurrentSong = createSelector(
  (state: RootState) => state.audioPlayer,
  (audioPlayer) =>
    audioPlayer.songs[audioPlayer.currentIndex] || ({} as SongItemDetailsView)
);
export default audioPlayerSlice.reducer;
