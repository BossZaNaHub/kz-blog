"use client";

import { FC } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IconBaseProps } from "react-icons";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";

interface NavigationMenu {
  menu: Menu[];
}

export type Menu = {
  name: string;
  path: string;
  icon?: React.ReactElement<IconBaseProps>;
};

const Navigation: FC<NavigationMenu> = (props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {props.menu.map((m: Menu, i: number) => {
        return (
          <div
            key={i}
            className={`${
              pathname === m.path
                ? "bg-white shadow-md dark:bg-slate-800"
                : "hover:bg-gray-100 dark:hover:bg-slate-800 dark:hover:text-white"
            } cursor-pointer rounded-full p-3 transition-colors dark:text-white`}
            onClick={() => {
              router.push(m.path);
            }}
          >
            <div>{m.icon && <span className="text-2xl">{m.icon}</span>}</div>
          </div>
        );
      })}
      {/* <div> */}
      <DarkModeSwitcher />
      {/* </div> */}
    </>
  );
};

export default Navigation;
