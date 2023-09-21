"use cliient";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { reactotronMiddleware } from "./middleware/reactotron";
// import { WebStorage, persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import userReducer from "./user/userSlice";
import blogReducer from "./blog/blogSlice";
import registerReducer from "./register/registerSlice";
import profileReducer from "./admin/profile/profileSlice";
import adminBlogReducer from "./admin/blog/adminBlogSlice";

// interface Config {
//   key: string;
//   storage: WebStorage;
//   version: number;
// }

// const persistConfig: Config = {
//   key: "root",
//   storage: storage,
//   version: 1,
// };

const rootReducer = combineReducers({
  user: userReducer,
  blog: blogReducer,
  register: registerReducer,
  profile: profileReducer,
  admin_blog: adminBlogReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // enhancers: [reactotronMiddleware.createEnhancer()],
  // serializableCheck: {
  //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  // },
});

// export const persistor = persistStore(store);

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
