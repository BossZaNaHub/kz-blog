import { createSlice } from "@reduxjs/toolkit";
import { Blog } from "./model";
import { adminListBlog } from ".";

interface AdminBlogState {
  data: Blog[] | null;
  isLoading: boolean;
  error: string | null;
}

// Async thunk for API call
const initialState: AdminBlogState = {
  data: null,
  isLoading: false,
  error: null,
};

const adminBlog = createSlice({
  name: "admin_blog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminListBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(adminListBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        const { payload } = action;
        if (payload.code == 0) {
          const data = payload.data.blogs as Blog[];
          state.data = data;
        } else {
          state.error = payload.message;
        }
      })
      .addCase(adminListBlog.rejected, (state, action) => {
        state.isLoading = false;
        const { error } = action;
        state.error = `${error.message}`;
      });
  },
});

export default adminBlog.reducer;
