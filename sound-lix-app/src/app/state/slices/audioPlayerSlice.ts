import { SongItemDetailsView } from "@/models/views";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AudioPlayerState {
  songs: SongItemDetailsView[];
}

const initialState: AudioPlayerState = { songs: [] };

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    playSong: (state, action: PayloadAction<AudioPlayerState>) => {
      state.songs = action.payload.songs;
    },
  },
});

export const { playSong } = audioPlayerSlice.actions;
export const getCurrentSong = createSelector(
  (state: RootState) => state.audioPlayer.songs,
  (songs: SongItemDetailsView[]) =>
    songs.find((x) => x.isSelected) || ({} as SongItemDetailsView)
);
export default audioPlayerSlice.reducer;
