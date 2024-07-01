import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import axios from "axios";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Fetch user info if not already fetched
  //   if (!userInfo || !userInfo.username) {
  //     fetchUserInfo();
  //   }
  // }, [userInfo]);

  // const fetchUserInfo = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/profile", {
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       const userData = await response.json();
  //       setUserInfo(userData);
  //     } else {
  //       console.error("Failed to fetch user information");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user information:", error);
  //   }
  // };

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/login");
        setUserInfo(null);
        localStorage.removeItem('userInfo');
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const path = window.location.pathname; // Use window.location for path

  return (
    <Navbar className="shadow sticky w-full top-0 z-10" fluid rounded>
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

      {/* Signin, logout, and navigation links */}
      <div className="flex gap-2 md:order-2">
        {userInfo && userInfo.username ? (
          <Button
            onClick={logout}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 focus:ring-0 hover:scale-125 "
            outline
          >
            Logout
          </Button>
        ) : (
          <Button
            as={Link}
            to="/register"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 focus:ring-0 hover:scale-125 "
            outline
          >
            Register
          </Button>
        )}

        <NavbarToggle />
      </div>

      {/* Navbar links */}
      <NavbarCollapse>
        <NavbarLink active={path === "/"} as={Link} to="/">
          Home
        </NavbarLink>
        <NavbarLink active={path === "/about"} as={Link} to="/about">
          About
        </NavbarLink>
        <NavbarLink
          active={path === "/create-post"}
          as={Link}
          to="/create-post"
        >
          Create Post
        </NavbarLink>
        <NavbarLink active={path === "/view-posts"} as={Link} to="/view-posts">
          View Posts
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
