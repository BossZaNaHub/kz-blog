"use client";

import React, { useContext, useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { ThemeContext } from "../ThemeProvider";

const DarkModeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(theme === "dark");
  }, [theme]);

  return (
    <label
      className={`relative m-0 block h-10 w-20 cursor-pointer rounded-full bg-gradient-to-b drop-shadow-md dark:bg-slate-800`}
    >
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
        className={`shadow-switcher absolute left-[3px] top-1/2 flex h-8 w-8 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full shadow-md duration-75
        ease-linear dark:bg-slate-800 ${isDark ? "translate-x-10" : "translate-x-0"}`}
      >
        {theme === "dark" && mounted ? <LuMoon /> : <LuSun />}
      </span>
    </label>
  );
};

export default DarkModeSwitcher;
