import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const Root = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-between">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
