import { createSlice } from "@reduxjs/toolkit";
import { Profile } from "./model";
import { userProfile } from "./profileService";

interface ProfileState {
  data: Profile | null;
  isLoading: boolean;
  error: string | null;
}

// Async thunk for API call
const initialState: ProfileState = {
  data: null,
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const { payload } = action;
        if (payload.code == 0) {
          let userData = payload.data as Profile;
          state.data = userData;
        } else {
          state.error = payload.message;
        }
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.isLoading = false;
        const { payload } = action;
        console.log("profile rejected: ", payload);
      });
  },
});

export default profileSlice.reducer;
