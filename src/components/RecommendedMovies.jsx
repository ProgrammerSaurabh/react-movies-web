import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loading, loadMovies } from "../store/actions/movies.actions";
import Movies from "./Movies";

import Loader from "./Loader";
import { Container } from "react-bootstrap";

function RecommendedMovies() {
  const dispatch = useDispatch();

  const {
    movies,
    error,
    loading: loading_,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(loading());
    dispatch(loadMovies());
  }, []);

  return (
    <Container fluid className="my-2">
      <div className="my-2">
        <h4 className="h4">
          Recommended Movies (
          {movies.filter((movie) => movie.type === "recommended").length})
        </h4>
        <hr className="my-2" />
        {loading_ ? (
          <Loader text="Loading recommended movies..." />
        ) : error ? (
          <h3 className="h3 py-2 text-center">Error</h3>
        ) : movies.filter((movie) => movie.type === "recommended").length >
          0 ? (
          <Movies
            movies={movies.filter((movie) => movie.type === "recommended")}
          />
        ) : (
          <h5 className="h5 py-2 text-center">No recommended movies</h5>
        )}
      </div>
    </Container>
  );
}

export default RecommendedMovies;
