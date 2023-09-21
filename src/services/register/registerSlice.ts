import { createSlice } from "@reduxjs/toolkit";
import { adminRegister } from ".";

interface RegisterState {
  data: any | null;
  isLoading: boolean;
  error: string | null;
  // error: SerializedError | null
}

// Async thunk for API call
const initialState: RegisterState = {
  data: null,
  isLoading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(adminRegister.pending, (state) => {
        // console.log('pending: ', state)
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(adminRegister.fulfilled, (state, action) => {
        // console.log('fulfilled: ', state, action.payload)
        state.isLoading = false;
        const { payload } = action;
        console.log("payload: ", payload);
        if (payload.code == 0) {
          let userData = payload.data as UserAuthentication;
          state.data = userData;
          state.isAuthenticated = true;
        } else {
          state.error = payload.message;
        }
      })
      .addCase(adminRegister.rejected, (state, action) => {
        state.isLoading = false;
        const { payload } = action;
        console.log(payload);
      });
  },
});

export default registerSlice.reducer;
