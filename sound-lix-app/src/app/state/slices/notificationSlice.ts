import { User } from "@/models/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  authModal: {
    show: boolean;
    image: string;
  };
}

const initialState: AuthState = {
  authModal: {
    show: false,
    image: "",
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setAuthModal: (
      state,
      action: PayloadAction<{ show: boolean; image: string }>
    ) => {
      state.authModal = action.payload;
    },
  },
});

export const { setAuthModal } = notificationSlice.actions;

export default notificationSlice.reducer;
