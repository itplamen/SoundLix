import { SongItemDetailsView } from "@/models/views";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioPlayerState {
  currentSong: SongItemDetailsView;
}

const initialState: AudioPlayerState = { currentSong: {} };

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<SongItemDetailsView>) => {
      state.currentSong = action.payload;
    },
  },
});

export const { play } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
