import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Movies from "../components/Movies";
import SubHeader from "../components/SubHeader";
import { loading, loadMovies } from "../store/actions/movies.actions";

function UpcomingMovies() {
  const dispatch = useDispatch();

  const {
    movies,
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
          Upcoming Movies (
          {movies.filter((movie) => movie.type === "upcoming").length})
        </h4>
        <hr className="my-2" />
        {loading_ ? (
          <Loader text="Loading upcoming movies..." />
        ) : error ? (
          <h3 className="h3 py-2 text-center">Error</h3>
        ) : movies.filter((movie) => movie.type === "upcoming").length > 0 ? (
          <Movies
            movies={movies.filter((movie) => movie.type === "upcoming")}
          />
        ) : (
          <h5 className="h5 py-2 text-center">No upcoming movies</h5>
        )}
      </div>
    </Container>
  );
}

export default UpcomingMovies;
