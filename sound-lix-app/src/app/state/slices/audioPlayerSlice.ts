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
    playSong: (state, action: PayloadAction<AudioPlayerState>) => {
      state.currentSong = action.payload.currentSong;
    },
  },
});

export const { playSong } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
