import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            <h3 className="h3">E Cube</h3>
          </Link>
          <Search />
        </div>
      </nav>
    </header>
  );
}

export default Header;
