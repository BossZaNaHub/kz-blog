"use client";
import { useEffect, useState } from "react";
import DarkModeSwitcher from "./DarkModeSwitcher";

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div className="flex">
      <div className="outer-menu">
        <input id="drawer-toggle" className="drawer-toggle" type="checkbox" />
        <div className="hambuger">
          <div></div>
        </div>
        <div className="menu">
          <div>
            <div>
              <div className="px-6 py-4">
                <a href="/">
                  <h2 className="text-lg font-semibold">Home</h2>
                  <p className="text-gray-500">ホーム</p>
                </a>
              </div>
              <div className="px-6 py-4">
                <a href="/contact">
                  <h2 className="text-lg font-semibold">Profile</h2>
                  <p className="text-gray-500">プロフィール</p>
                </a>
              </div>
              <div className="px-6 py-4">
                <a href="/blog">
                  <h2 className="text-lg font-semibold">Blog</h2>
                  <p className="text-gray-500">ブログ</p>
                </a>
              </div>
              <div className="px-6 py-4">
                {/* <!-- Dark Mode Toggler --> */}
                <DarkModeSwitcher />
                {/* <!-- Dark Mode Toggler --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
