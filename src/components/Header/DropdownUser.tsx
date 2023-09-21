import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/services/Auth";
import { LuLogOut, LuUser } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "@/services";
import { userProfile } from "@/services/admin/profile";
import { LuRefreshCcw } from "react-icons/lu";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state: RootStore) => state.profile);

  useEffect(() => {
    if (user) {
      dispatch(userProfile());
    }
  }, [user]);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleLogout = () => {
    logout();
  };

  const refreshProfile = () => {
    dispatch(userProfile());
  };

  return (
    <div className="relative">
      <Link ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-4" href="#">
        <span className="hidden text-right lg:block">
          {data?.name ? (
            <span className="block text-sm font-medium text-black dark:text-white">{data?.name}</span>
          ) : (
            <button onClick={() => refreshProfile()}>
              <LuRefreshCcw />
            </button>
          )}

          {/* <span className="block text-xs">{user?.user?.name}</span> */}
        </span>

        <span className="flex h-12 w-12 items-center rounded-full text-3xl">
          <LuUser />
        </span>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`w-62.5 bg-primary shadow-default dark:border-strokedark dark:bg-boxdark absolute right-0 mt-4 flex flex-col rounded-sm ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="py-7.5 dark:border-strokedark flex flex-col gap-5 border-b border-b-blue-200 px-6">
          <li>
            <Link
              href="profile"
              className="hover:text-primary flex items-center gap-3.5 py-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base"
            >
              <LuUser />
              {data?.mobile_number}
            </Link>
          </li>
        </ul>
        <button
          className="hover:text-primary flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out lg:text-base"
          onClick={() => handleLogout()}
        >
          <LuLogOut />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
