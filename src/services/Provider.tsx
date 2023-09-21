"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { AuthProvider } from "./Auth";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};
