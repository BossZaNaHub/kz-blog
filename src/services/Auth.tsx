"use client";

import { ReactNode, createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login, UserAuthentication, clientAuth, clientLogin, clientLogout } from "./user";
import { RootStore } from ".";
import { useRouter } from "next/navigation";

interface AuthProviderConfig {
  children: ReactNode;
}

type AuthProviderContext = {
  user: UserAuthentication | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: Login) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthProviderContext | null>({
  user: null,
  isAuthenticated: false,
  loading: false,
  login: (data: Login) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderConfig) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootStore) => state.user.data);
  const isAuthenticated = useSelector((state: RootStore) => state.user.isAuthenticated);
  const loading = useSelector((state: RootStore) => state.user.isLoading);

  useEffect(() => {
    const auth = localStorage.getItem("authenticated");
    if (auth) {
      const userData = JSON.parse(auth) as UserAuthentication;
      dispatch(clientAuth(userData));
    }
  }, []);

  const login = (data: Login) => {
    console.log("...login", data);
    dispatch(clientLogin(login));
  };

  const logout = () => {
    dispatch(clientLogout());
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
