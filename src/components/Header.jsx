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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-end align-items-center"
            id="navbarSupportedContent"
          >
            <Search />
            <ul className="navbar-nav mb-2 mb-lg-0"></ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
