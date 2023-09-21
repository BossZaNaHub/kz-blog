import { createAsyncThunk } from "@reduxjs/toolkit";
import { Response as BaseResp } from "../common";
import client from "../api/api";

const clientListBlog = createAsyncThunk("blog/fetch", async () => {
  const response = await client.get("/v1/client/blogs");
  if (!response.ok) {
    let e: BaseResp = {
      data: null,
      code: response.status || 500,
      message: `${response.problem} ${response.originalError}`,
    };
    return e;
  } else {
    return response.data as BaseResp;
  }
});

const clientGetBlogBySlug = async (slug: string) => {
  try {
    const response = await client.get(`/v1/client/blog/${slug}`);
    console.log("clientGetBlogBySlug: ", response);
    return response.data as BaseResp;
  } catch (error) {
    throw error;
  }
};

export { clientListBlog, clientGetBlogBySlug };
