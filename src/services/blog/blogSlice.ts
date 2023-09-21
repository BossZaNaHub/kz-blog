import { createSlice } from "@reduxjs/toolkit";
import { Blog, clientListBlog } from ".";

interface BlogState {
  data: Blog[] | null;
  isLoading: boolean;
  error: string | null;
}

// Async thunk for API call
const initialState: BlogState = {
  data: [],
  isLoading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clientListBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(clientListBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        const { payload } = action;
        console.log("payload: ", payload);
        if (payload.code == 0) {
          let data = payload.data.blogs as Blog[];
          state.data = data;
        } else {
          state.error = payload.message;
        }
      })
      .addCase(clientListBlog.rejected, (state, action) => {
        console.log("rejected error: ", state, action);
        state.isLoading = false;
        // const { payload } = action;

        // state.error =  payload.message
      });
  },
});

export default blogSlice.reducer;
