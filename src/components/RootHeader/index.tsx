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

  useEffect(() => {
    const handleScrollY = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [scrollY]);

  if (!pathname.includes("/dashboard")) {
    return (
      <header
        className={`sticky top-0 z-50 mx-auto flex w-11/12 bg-transparent px-10 md:mx-auto md:max-w-screen-md ${
          scrollY >= 50
            ? "bg-dashboard-1 translate-y-1.5 rounded-full shadow-md"
            : ""
        }`}
      >
        <div className="shadow-2 flex flex-grow items-center justify-between py-2.5 md:px-6 2xl:px-10">
          <Navigation menu={menu} />
        </div>
      </header>
    );
  }
};

export default Header;
