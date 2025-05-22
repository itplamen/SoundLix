import { SongItemDetailsView } from "@/models/views";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AudioPlayerState {
  songs: SongItemDetailsView[];
  currentIndex: number;
}

const changeSong = (state: AudioPlayerState, direction: "next" | "prev") => {
  if (state.currentIndex === -1) return;

  const offset = direction === "next" ? 1 : -1;
  const newIndex = state.currentIndex + offset;

  if (newIndex >= 0 && newIndex < state.songs.length) {
    state.currentIndex = newIndex;
    state.songs = state.songs.map((song, index) => ({
      ...song,
      isPlaying: state.currentIndex === index,
    }));
  }
};

const initialState: AudioPlayerState = { songs: [], currentIndex: -1 };

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    playSong: (
      state,
      action: PayloadAction<SongItemDetailsView[] | undefined>
    ) => {
      state.currentIndex = 0;
      state.songs = (action?.payload || state.songs).map(
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
    playNextSong: (state) => {
      changeSong(state, "next");
    },
    playPrevSong: (state) => {
      changeSong(state, "prev");
    },
  },
});

export const { playSong, pauseSong, playNextSong, playPrevSong } =
  audioPlayerSlice.actions;
export const getCurrentSong = createSelector(
  (state: RootState) => state.audioPlayer,
  (audioPlayer) =>
    audioPlayer.songs[audioPlayer.currentIndex] || ({} as SongItemDetailsView)
);
export default audioPlayerSlice.reducer;
