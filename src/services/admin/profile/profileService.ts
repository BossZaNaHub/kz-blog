import { createAsyncThunk } from "@reduxjs/toolkit";
import { Response as BaseResp } from "../../common";
import client from "../../api/api";

const userProfile = createAsyncThunk("profile/fetch", async () => {
  const response = await client.get("/v1/crm/user/profile");
  if (!response.ok) {
    let e: BaseResp = {
      data: null,
      code: response.status ? response.status : 500,
      message: `${response.problem} ${response.originalError}`,
    };
    return e;
  }
  return response.data as BaseResp;
});

export { userProfile };
