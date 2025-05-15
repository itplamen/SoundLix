import { configureStore } from "@reduxjs/toolkit";
import audioPlayerReducer from "./slices/audioPlayerSlice";

export const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
