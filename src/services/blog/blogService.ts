import { createAsyncThunk } from "@reduxjs/toolkit";
import { Response as BaseResp } from "../common";
import api from "../api";

const clientListBlog = createAsyncThunk("blog/fetch", async () => {
  try {
    const response = await api.get("/v1/client/blogs");
    return response.data as BaseResp;
  } catch (error) {
    throw error;
  }
});

const clientGetBlogBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/v1/client/blog/${slug}`);
    console.log("clientGetBlogBySlug: ", response);
    return response.data as BaseResp;
  } catch (error) {
    throw error;
  }
};

export { clientListBlog, clientGetBlogBySlug };
