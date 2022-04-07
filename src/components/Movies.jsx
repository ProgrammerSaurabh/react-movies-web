import React from "react";
import { Col, Row } from "react-bootstrap";
import Movie from "./Movie";

function Movies({ movies = [] }) {
  return (
    <Row xs={1} md={4} className="g-4">
      {movies.map((movie) => (
        <Col key={`recommended-movie-${movie.id}`}>
          <Movie movie={movie} />
        </Col>
      ))}
    </Row>
  );
}

export default Movies;
