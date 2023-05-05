import { Button, Text } from "@mantine/core";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import React from "react";

const navList = [
  { title: "Home", url: "/" },
  // { title: 'Upload', url: '/profile/upload' },
  // { title: "Profile", url: "/profile" },
  // { title: "Forms", url: "/forms" },
  { title: "About", url: "/about" },
];

const NavLinkItem = ({ children, path }: { children: any; path: string }) => (
  <li className="list-none m-0 p-0">
    <NavLink
      end
      to={path}
      className={({ isActive }) => (isActive ? "text-white" : "text-blue-500")}
    >
      <p className="font-semibold p-0 leading-none hover:text-white">
        {children}
      </p>
    </NavLink>
  </li>
);

const NavBar = () => {
  const [hasToken, setHasToken] = React.useState(
    !!localStorage.getItem("token")
  );
  return (
    <nav className="p-0 m-0 px-8 flex justify-between items-center bg-blue-300 brand-lg">
      <Link
        to="/"
        className="flex gap-2 items-center hover:text-blue-500 text-white"
      >
        <Icon icon="ic:outline-remove-red-eye" className="text-2xl pt-1" />
        <Text className="font-bold text-xl">Drishya</Text>
      </Link>
      <div className="flex gap-10">
        {navList?.map((item) => (
          <NavLinkItem key={item.title + item.url} path={item.url}>
            {item.title}
          </NavLinkItem>
        ))}
      </div>
      <Link to={hasToken ? "/profile" : "/login"}>
        <Button
          leftIcon={
            hasToken ? (
              <Icon icon="gg:profile" />
            ) : (
              <Icon icon="material-symbols:login" />
            )
          }
          className="item-center text-base"
        >
          {hasToken ? "Profile" : "Login"}
        </Button>
      </Link>
    </nav>
  );
};

export default NavBar;
