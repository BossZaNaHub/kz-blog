"use client";
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

type ThemeProviderProps = {
  initialTheme?: string;
  children: ReactNode;
};

interface ThemeContextProps {
  theme?: string;
  setTheme?: Dispatch<SetStateAction<string>>;
}

const getInitialTheme = (): string => {
  if (typeof window !== "undefined" && window.localStorage) {
    const stored = window.localStorage.getItem("theme");
    if (typeof stored === "string") {
      return stored;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    console.log("userMedia: ", userMedia);
    if (userMedia.matches) {
      return "dark";
    }
    // If you want to use light theme as the default, return "light" instead
  }
  return "light";
};

export const ThemeContext = createContext<ThemeContextProps>({});

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const [theme, setTheme] = useState<string>(getInitialTheme());
  useEffect(() => {
    newSetTheme(theme);
  }, [theme]);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      console.log("handleChange: ", darkModeMediaQuery);
      if (darkModeMediaQuery.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
      newSetTheme(theme);
    };

    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  });

  const newSetTheme = (theme: string) => {
    const root = window.document.documentElement;
    // const isDark = theme;
    // root.classList.remove(isDark ? "light" : "dark");
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  };

  if (props.initialTheme) {
    newSetTheme(props.initialTheme);
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{props.children}</ThemeContext.Provider>;
};

export default ThemeProvider;
