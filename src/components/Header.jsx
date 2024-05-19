import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveTab("Home");
        break;
      case "/add":
        setActiveTab("AddContact");
        break;
      case "/about":
        setActiveTab("About");
        break;
      default:
        setActiveTab("Home");
        break;
    }
  }, [location.pathname]);

  return (
    <div className="header">
      {" "}
      {/* Updated to use the correct class name */}
      <p className="logo">Contact App</p>
      <div className="header-right">
        <Link to="/">
          <p
            className={activeTab === "Home" ? "active" : ""}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={activeTab === "AddContact" ? "active" : ""}
            onClick={() => setActiveTab("AddContact")}
          >
            Add Contact
          </p>
        </Link>
        <Link to="/about">
          <p
            className={activeTab === "About" ? "active" : ""}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
