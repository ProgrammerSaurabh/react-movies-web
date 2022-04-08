import React from "react";

import styles from "./Movies.module.css";
import Movie from "../Movie";

function Movies({ movies = [] }) {
  return (
    <div className={styles.flexContainer}>
      {movies.map((movie) => (
        <Movie key={`recommended-movie-${movie.id}`} movie={movie} />
      ))}
    </div>
  );
}

export default Movies;
