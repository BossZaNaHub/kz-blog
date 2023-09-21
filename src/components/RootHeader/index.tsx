"use client";
import { LuDog, LuLibrary, LuPhone } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Navigation, { Menu } from "./Navigation";
import { useEffect, useState } from "react";

const menu: Menu[] = [
  { name: "", path: "/blog", icon: <LuLibrary /> },
  { name: "", path: "/", icon: <LuDog /> },
  { name: "", path: "/contact", icon: <LuPhone /> },
];

const Header = () => {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState<number>(0);
  const [showTop, setShowTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScrollY = () => {
      setScrollY(window.scrollY);
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;
      if (scrollY > bodyHeight / 2 - windowHeight / 2) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };

    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [scrollY, showTop]);

  if (!pathname.includes("/dashboard")) {
    return (
      <>
        <button
          className={`fixed bottom-0 right-[15px] z-50 transition-all ${
            showTop ? "translate-y-[-15px] opacity-100" : "translate-y-0 opacity-0"
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 9-6-6-6 6" />
            <path d="M12 3v14" />
            <path d="M5 21h14" />
          </svg>
        </button>

        <header
          className={`sticky top-0 z-50 mx-auto flex w-11/12 bg-transparent px-10 md:mx-auto md:max-w-screen-md ${
            scrollY >= 50 ? "bg-dashboard-1 translate-y-1.5 rounded-full shadow-md" : ""
          }`}
        >
          <div className="shadow-2 flex flex-grow items-center justify-between py-2.5 md:px-6 2xl:px-10">
            <Navigation menu={menu} />
          </div>
        </header>
      </>
    );
  }
};

export default Header;
