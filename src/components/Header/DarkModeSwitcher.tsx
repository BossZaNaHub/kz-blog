"use client";

import { useContext, useEffect } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { ThemeContext } from "../ThemeProvider";

const DarkModeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {}, [theme]);
  // const [colorMode, setColorMode] = useColorMode();
  // console.log(colorMode);

  return (
    <label className={`relative m-0 block h-7 w-14 cursor-pointer rounded-full`}>
      <input
        type="checkbox"
        onChange={() => {
          if (typeof setTheme === "function") {
            setTheme && setTheme(isDark ? "light" : "dark");
          }
        }}
        className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
      />
      <span
        className={`shadow-switcher absolute left-[3px] top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full shadow-md duration-75 ease-linear
        dark:bg-slate-800`}
      >
        <span className="dark:hidden">
          <LuSun />
        </span>
        <span className="hidden dark:inline-block">
          <LuMoon />
        </span>
      </span>
    </label>
  );
};

export default DarkModeSwitcher;
