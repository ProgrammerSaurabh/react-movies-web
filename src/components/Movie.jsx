import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Movie({ movie = {} }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.stars}</Card.Text>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="primary">Book now</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Movie;
