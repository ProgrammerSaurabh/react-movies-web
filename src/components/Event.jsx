import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Event({ event = {} }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={event.image} />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.stars}</Card.Text>
        <Link to={`/movies/${event.id}`}>
          <Button variant="primary">Book now</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Event;
