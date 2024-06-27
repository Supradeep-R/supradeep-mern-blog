import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import Dashboard from "../src/Pages/Dashboard";
import Projects from "../src/Pages/Projects";
import Signin from "../src/Pages/Signin";
import Signup from "../src/Pages/Signup";

const App = () => {
  return (
    <div className="text-3xl">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/sign-in" element={<Signin />} />
        <Route exact path="/sign-up" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
