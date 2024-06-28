import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch } from "react-redux";
import { logout } from "../Pages/Auth/AuthSlicer";
import useNavigation from "../Hooks/useNavigation";

type Props = {
  userId: () => string;
};

const userNavigation = [
  {
    name: "MyLinks",
    path: "/dashboard",
    element: <LaunchIcon color="secondary" />,
  },
  {
    name: "Logout",
    path: "/auth",
    element: <ExitToAppIcon color={"warning"} />,
  },
];

export default function Dropdown({ userId }: Props) {
  const dispatch = useDispatch();
  const { goTo } = useNavigation();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2  ">
          <Avatar alt={`${userId()}`} src="/static/images/avatar/1.jpg" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {userNavigation.map((item, index) => (
          <MenuItem key={index}>
            <Link
              to={`${item.path}`}
              className="block px-4 py-2 text-sm text-gray-700 mt-2 w-48 origin-top-right rounded-md flex items-center focus:bg-slate-400 hover:bg-slate-200"
              onClick={item.name === "Logout" ? handleLogout : () => {}}
            >
              <span>{item.element}</span>
              <span className="ml-3 font-semibold">{item.name}</span>
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
