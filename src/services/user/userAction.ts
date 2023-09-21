import { createAction } from "@reduxjs/toolkit";
import { UserAuthentication } from ".";

export const clientLogout = createAction("user/clientLogout");
export const clientUserReset = createAction("user/clientUserReset");
export const clientAuth = createAction<UserAuthentication | null>("user/clientAuth");
