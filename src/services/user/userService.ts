import { createAsyncThunk } from "@reduxjs/toolkit";

import { Login } from "./model";
import { Response as BaseResp } from "../common";
import client from "../api/api";

const clientLogin = createAsyncThunk("login/fetch", async (loginData: Login) => {
  const response = await client.post("/v1/client/login", loginData);
  if (!response.ok) {
    let e: BaseResp = {
      data: null,
      code: response.status ? response.status : 500,
      message: `${response.problem} ${response.originalError}`,
    };
    return e;
  } else {
    return response.data as BaseResp;
  }
});

const userProfile = createAsyncThunk("profile/fetch", async () => {
  const response = await client.get("/v1/user/profile");
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

export { clientLogin, userProfile };
