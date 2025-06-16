import { User } from "@/models/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: {
    role: "Guest",
  } as User,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setSignIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signedOut: (state) => {},
  },
});

export const { setSignIn, signedOut } = authSlice.actions;

export default authSlice.reducer;
