import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import ViewPosts from "../src/Pages/ViewPosts";
import ViewSinglePost from "../src/Pages/ViewSinglePost";
import Register from "../src/Pages/Register";
import Login from "../src/Pages/Login";
import Header from "../src/Components/Header";
import FooterComp from "./Components/FooterComp";
import { UserContextProvider } from "../context/UserContext";
import CreatePost from "./Pages/CreatePost";
import EditPost from "./Pages/EditPost";

const App = () => {
  return (
    <UserContextProvider>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/create-post" element={<CreatePost />} />
        <Route exact path="/view-posts" element={<ViewPosts />} />
        <Route exact path="/view-single-post/:id" element={<ViewSinglePost />} />
        <Route exact path="/edit-post/:id" element={<EditPost />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <FooterComp/>
    </UserContextProvider>
  );
};

export default App;
