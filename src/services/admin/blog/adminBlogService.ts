import { createAsyncThunk } from "@reduxjs/toolkit";
import { Response as BaseResp } from "../../common";
import client from "../../api/api";

const adminListBlog = createAsyncThunk("admin/blog/fetch", async () => {
  const response = await client.get("/v1/crm/blog");
  if (!response.ok) {
    console.log(response);
    let errCode = response.status;
    let errMsg = `${response.problem} ${response.originalError}`;
    if (response.data) {
      let data = response.data as BaseResp;
      errCode = data.code;
      errMsg = data.message;
    }
    let e: BaseResp = {
      data: null,
      code: errCode || 500,
      message: errMsg,
    };
    return e;
  } else {
    return response.data as BaseResp;
  }
});

export { adminListBlog };
