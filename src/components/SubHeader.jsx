import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const SUB_HEADERS = [
  {
    title: "Latest movies",
    route: "latest-movies",
    type: "latest",
  },
  {
    title: "Upcoming movies",
    route: "upcoming-movies",
    type: "upcoming",
  },
  {
    title: "Nearby events",
    route: "nearby-events",
    type: "event",
  },
];

function SubHeader() {
  const { pathname } = useLocation();

  const { movies = [] } = useSelector((state) => state.movies);

  return (
    <Nav justify variant="pills">
      {SUB_HEADERS.map((header) => (
        <Link
          key={`sub-header-${header.route}`}
          children={
            <>
              {header.title}&nbsp;(
              {movies.filter((movie) => movie.type == header.type).length})
            </>
          }
          className={`text-decoration-none nav-link border py-2 ${
            pathname.match(`/${header.route}`) ? "active" : ""
          }`}
          to={`/${header.route}`}
        />
      ))}
    </Nav>
  );
}

export default SubHeader;
