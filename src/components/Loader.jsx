import React from "react";
import { Spinner } from "react-bootstrap";

function Loader({ text = "Loading..." }) {
  return (
    <div className="py-4 text-center">
      <Spinner animation="border" variant="secondary" role="status">
        <span className="visually-hidden">{text}</span>
      </Spinner>
      <h5 className="h5 text-muted">{text}</h5>
    </div>
  );
}

export default Loader;
