import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "./storage";
import audioPlayerReducer from "./slices/audioPlayerSlice";
import authReducer from "./slices/authSlice";
import notifyReducer from "./slices/notificationSlice";

const rootReducer = combineReducers({
  audioPlayer: audioPlayerReducer,
  authentication: authReducer,
  notification: notifyReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["audioPlayer", "authentication"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
