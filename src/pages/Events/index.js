import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import SubHeader from "../../components/SubHeader";
import { loading, loadMovies } from "../../store/actions/movies.actions";

import styles from "./Events.module.css";
import Event from "../../components/Event";

function Events() {
  const dispatch = useDispatch();

  const {
    movies: events,
    loading: loading_,
    error,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(loading());
    dispatch(loadMovies());
  }, []);

  return (
    <Container fluid className="my-2">
      <SubHeader />
      <div className="my-2">
        <h4 className="h4">
          Events ({events.filter((event) => event.type === "event").length})
        </h4>
        <hr className="my-2" />
        {loading_ ? (
          <Loader text="Loading events..." />
        ) : error ? (
          <h3 className="h3 py-2 text-center">Error</h3>
        ) : events.filter((movie) => movie.type === "event").length > 0 ? (
          <div className={styles.flexContainer}>
            {events
              .filter((movie) => movie.type === "event")
              .map((event) => (
                <Event key={`event-${event.id}`} event={event} />
              ))}
          </div>
        ) : (
          <h5 className="h5 py-2 text-center">No events</h5>
        )}
      </div>
    </Container>
  );
}

export default Events;
