"use client";
import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";

export const reactotronMiddleware = Reactotron.configure({ name: "kz-blog", environment: process.env.NODE_ENV })
  .use(reactotronRedux())
  .connect();
