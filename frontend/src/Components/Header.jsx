import React from "react";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  Button,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";

const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar fluid rounded>
      {/* Logo */}
      <NavbarBrand as={"div"}>
        <NavbarBrand as={Link} to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Supradeep's Blog Website
          </span>
        </NavbarBrand>
      </NavbarBrand>

      {/* Search Functionality */}
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline focus:outline-none focus:ring-full"
        ></TextInput>
      </form>
      <Button className="lg:hidden" color="gray">
        <AiOutlineSearch />
      </Button>

      {/* Signin and drop downs and navigations */}
      <div className="flex gap-2 md:order-2">
        <Button
          as={Link}
          to="/register"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 focus:ring-0 hover:scale-125 "
          outline
        >
          Register
        </Button>
        {/* <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown> */}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink active={path === "/"} as={Link} to="/">
          Home
        </NavbarLink>
        <NavbarLink active={path === "/about"} as={Link} to="/about">
          About
        </NavbarLink>
        <NavbarLink active={path === "/dashboard"} as={Link} to="/dashboard">
          Dashboard
        </NavbarLink>
        <NavbarLink active={path === "/projects"} as={Link} to="/projects">
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
