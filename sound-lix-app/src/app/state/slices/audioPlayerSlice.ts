import { SongItemDetailsView } from "@/models/views";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { VOLUME_CONFIG } from "@/utils/constants";
import { Entity } from "@/models/data";

interface AudioPlayerState {
  owner: Entity;
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
  owner: {} as Entity,
  songs: [],
  currentIndex: 0,
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
  const offset = direction === "next" ? 1 : -1;
  const newIndex = payload
    ? state.songs.findIndex((x) => x.id === payload?.id)
    : state.currentIndex + offset;

  if (newIndex >= 0 && newIndex < state.songs.length) {
    state.songs = state.songs.map((song, index) => ({
      ...song,
      isPlaying: newIndex === index,
    }));

    state.time = {
      currentTime: 0,
      duration: 0,
    };
    state.currentIndex = state.songs.findIndex((song) => song.isPlaying);
  }
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    playSong: (state, action: PayloadAction<SongItemDetailsView[]>) => {
      if (
        action.payload.length === 1 &&
        action.payload[0].id === state.songs[state.currentIndex]?.id
      ) {
        state.songs[state.currentIndex].isPlaying = true;
        state.songs[state.currentIndex].playedAt = new Date();
      } else {
        if (
          action.payload.length === 1 &&
          action.payload[0].ownerId === state.owner.id
        ) {
          state.time = {
            currentTime: 0,
            duration: 0,
          };
          state.currentIndex = state.songs.findIndex(
            (song) => song.id === action.payload[0].id
          );

          state.songs[state.currentIndex].isPlaying = true;
          state.songs[state.currentIndex].playedAt = new Date();
        } else {
          state.time = {
            currentTime: 0,
            duration: 0,
          };
          state.currentIndex = 0;

          state.songs = action.payload.map(
            (song: SongItemDetailsView, index: number) => ({
              ...song,
              isPlaying: state.currentIndex === index,
              playedAt: state.currentIndex === index ? new Date() : undefined,
            })
          );
          state.owner = {
            id: action.payload[0].ownerId,
            name: action.payload[0].name,
          };
        }
      }
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
