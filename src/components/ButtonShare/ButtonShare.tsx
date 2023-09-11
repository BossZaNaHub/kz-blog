"use client";

import { useEffect, useRef, useState } from "react";
import {
  LuEye,
  LuMoreHorizontal,
  LuFacebook,
  LuLinkedin,
} from "react-icons/lu";

const ButtonShare = () => {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const buttonDropdownRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleDetectWindowToggleDropdown = (event: MouseEvent) => {
      if (
        buttonDropdownRef.current &&
        !buttonDropdownRef.current?.contains(event?.target as Node)
      ) {
        console.log(buttonDropdownRef.current);
        setToggleDropdown(false);
      }
    };

    window.addEventListener("click", handleDetectWindowToggleDropdown);
    return () => {
      window.removeEventListener("click", handleDetectWindowToggleDropdown);
    };
  }, []);

  const handleFacebookShare = () => {
    console.log("click");
  };

  const handleLinkedInShare = () => {
    console.log("click");
  };

  const handleToggleDropdown = () => {
    console.log("clicked dropdown");
    setToggleDropdown(!toggleDropdown);
  };

  return (
    <>
      <div className="h-px w-full bg-black dark:bg-white"></div>
      <div className="relative flex flex-row items-center justify-between py-2">
        <span className="flex items-center gap-1.5">
          <LuEye />
          <span>1.0k</span>
        </span>
        <span className="flex items-center">
          <button
            onClick={() => handleToggleDropdown()}
            ref={buttonDropdownRef}
          >
            <LuMoreHorizontal className="cursor-pointer" />
          </button>
          <div
            className={`absolute right-0 top-10 -z-10 mx-auto flex h-auto w-48 flex-col items-center rounded-md bg-white p-2.5 text-center shadow-md transition-all dark:bg-blue-900 md:w-80 ${
              toggleDropdown
                ? "visible  z-10 -translate-x-5 opacity-100"
                : "invisible translate-x-0 opacity-0"
            }`}
          >
            <button
              className="gap-1.5 px-1 py-1.5"
              onClick={() => handleFacebookShare()}
            >
              {/* <LuFacebook className="text-xl" /> */}
              <span className="text-sm">Share on Facebook</span>
            </button>
            <button
              className="gap-1.5 px-1 py-1.5"
              onClick={() => handleLinkedInShare()}
            >
              {/* <LuLinkedin className="text-xl" /> */}
              <span className="text-sm">Share on Linkin</span>
            </button>
            {/* </div> */}
          </div>
        </span>
      </div>
      <div className="h-px w-full bg-black dark:bg-white"></div>
    </>
  );
};

export default ButtonShare;
