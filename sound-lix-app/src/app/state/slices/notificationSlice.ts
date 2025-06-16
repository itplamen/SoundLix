import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  authModal: {
    show: boolean;
    image: string;
    isDownload: boolean;
  };
}

const initialState: AuthState = {
  authModal: {
    show: false,
    image: "",
    isDownload: false,
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setAuthModal: (
      state,
      action: PayloadAction<{
        show: boolean;
        image: string;
        isDownload: boolean;
      }>
    ) => {
      state.authModal = action.payload;
    },
  },
});

export const { setAuthModal } = notificationSlice.actions;

export default notificationSlice.reducer;
