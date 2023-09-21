import { createAsyncThunk } from "@reduxjs/toolkit";

import { Register } from "./model";
import { Response as BaseResp } from "../common";
import client from "../api/api";

const adminRegister = createAsyncThunk("register/fetch", async (registerData: Register, allow_register: string) => {
  try {
    const response = await client.post("/v1/client/", registerData);
    return response.data as BaseResp;
  } catch (error) {
    throw error;
  }
});

export { adminRegister };
