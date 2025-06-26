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
    setSignOut: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;

export default authSlice.reducer;
