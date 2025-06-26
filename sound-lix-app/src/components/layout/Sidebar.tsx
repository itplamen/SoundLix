"use client";

import { COLOR, USER_ROLE, UserRole } from "@/utils/constants";
import Icon from "../Icons/Icon";
import HomeIconType from "../Icons/Types/HomeIconType";
import ProfileIconType from "../Icons/Types/ProfileIconType";
import GitHubIconType from "../Icons/Types/GitHubIconType";
import SignInIconType from "../Icons/Types/SignInIconType";
import RadioIconType from "../Icons/Types/RadioIconType";
import SongIconType from "../Icons/Types/SongIconType";
import { useAppSelector } from "@/app/state/hooks";
import SignOutIconType from "../Icons/Types/SignOutIconType";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

type Item = {
  url: string;
  name: string;
  roles: UserRole[];
  icon: JSX.Element;
  onClick?: () => void;
};

const getItems = (): Item[][] => {
  const handleSingOut = async () => {
    await signOut(auth);
  };

  return [
    [
      {
        name: "Home",
        url: "/",
        roles: [USER_ROLE.USER, USER_ROLE.GUEST],
        icon: <HomeIconType />,
      },
      {
        name: "Explore",
        url: "/explore",
        roles: [USER_ROLE.USER],
        icon: <SongIconType />,
      },
      {
        name: "Radio",
        url: "#",
        roles: [USER_ROLE.USER],
        icon: <RadioIconType />,
      },
    ],
    [
      {
        name: "Sign In",
        url: "/signin",
        roles: [USER_ROLE.GUEST],
        icon: <SignInIconType />,
      },
      {
        name: "Sign Up",
        url: "/signup",
        roles: [USER_ROLE.GUEST],
        icon: <ProfileIconType />,
      },
    ],
    [
      {
        name: "GitHub",
        url: "https://github.com/itplamen/SoundLix",
        roles: [USER_ROLE.USER, USER_ROLE.GUEST],
        icon: <GitHubIconType />,
      },
    ],
    [
      {
        name: "Sign Out",
        url: "#",
        roles: [USER_ROLE.USER],
        icon: <SignOutIconType />,
        onClick: handleSingOut,
      },
    ],
  ];
};

const Sidebar = () => {
  const user = useAppSelector((state) => state.authentication.user);

  const items: Item[][] = getItems();
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-44 h-[calc(100vh-80px)] transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <a href="#" className="flex items-center ps-2.5 mb-5">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            SoundLix
          </span>
        </a>
        <span className="block p-3 mx-3 text-gray-400 text-xs uppercase font-bold">
          Menu
        </span>
        {items.map((arr: Item[], arrIndex: number) => (
          <ul key={`ul_${arrIndex}`} className="space-y-2 font-medium mb-14">
            {arr
              .filter((item: Item) => item.roles.includes(user.role))
              .map((item: Item, itemIndex: number) => (
                <li key={`li_${itemIndex}`}>
                  <Link
                    href={item.url}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    onClick={item.onClick}
                  >
                    <Icon size={25} color={COLOR.DARK_GRAY}>
                      {item.icon}
                    </Icon>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
