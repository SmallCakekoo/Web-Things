import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  username: string;
  role: "admin" | "client";
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const savedSession = localStorage.getItem("auth_session");
const initialState: AuthState = {
  user: savedSession ? JSON.parse(savedSession) : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("auth_session", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("auth_session");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
