import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-100 mb-5">
      <nav className="text-center d-flex flex-column rounded-4 p-2 flex-md-row align-items-center justify-content-center navbar navbar-expand navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          تارنمای بسامدگیری واژگان
        </Link>
        <div className="ps-5 text-center collapse navbar-collapse" id="navbarNav">
          <ul className="d-flex flex-column flex-md-row navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                صفحۀ اصلی
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/chart">
                جدول
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bar">
                نمودار میله‌ای
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bubble">
                نمودار حبابی
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tree">
                نمودار درختی
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cloud">
                نمودار ابری
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
