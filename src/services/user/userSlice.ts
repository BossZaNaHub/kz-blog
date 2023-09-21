import { createSlice } from "@reduxjs/toolkit";
import { UserAuthentication } from "./model";
import { clientLogin, userProfile } from ".";
import { setInterceptorToken } from "../api";
interface UserState {
  data: UserAuthentication | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Async thunk for API call
const initialState: UserState = {
  data: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clientLogout: () => {
      localStorage.removeItem("authenticated");
      return initialState;
    },
    clientUserReset: (state) => {
      state.error = null;
    },
    clientAuth: (state, action) => {
      state.isLoading = true;
      const { payload } = action;
      const user = payload as UserAuthentication;
      if (action.payload) {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.data = user;
        setInterceptorToken(user.authentication?.access_token);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clientLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
        state.isAuthenticated = false;
      })
      .addCase(clientLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        const { payload } = action;
        if (payload.code == 0) {
          let userData = payload.data as UserAuthentication;
          state.data = userData;
          state.isAuthenticated = true;
          localStorage.setItem("authenticated", JSON.stringify(userData));
          // setAuthToken(userData.authentication?.access_token);
        } else {
          state.error = payload.message;
        }
      })
      .addCase(clientLogin.rejected, (state, action) => {
        state.isLoading = false;
        const { payload } = action;
        console.log("login rejected: ", payload);
      });
  },
});

export default userSlice.reducer;
