import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import Dashboard from "../src/Pages/Dashboard";
import Projects from "../src/Pages/Projects";
import Register from "../src/Pages/Register";
import Login from "../src/Pages/Login";
import Header from "../src/Components/Header";
import FooterComp from "./Components/FooterComp";

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <FooterComp/>
    </div>
  );
};

export default App;
