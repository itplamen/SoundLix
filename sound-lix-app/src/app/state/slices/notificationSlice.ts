import { AuthModalTypeOption } from "@/utils/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  authModal: {
    show: boolean;
    image: string;
    type: AuthModalTypeOption;
  };
}

const initialState: AuthState = {
  authModal: {
    show: false,
    image: "",
    type: {} as AuthModalTypeOption,
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
        type: AuthModalTypeOption;
      }>
    ) => {
      state.authModal = action.payload;
    },
  },
});

export const { setAuthModal } = notificationSlice.actions;

export default notificationSlice.reducer;
