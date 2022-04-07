import React from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";

function MovieCarousel() {
  const { movies } = useSelector((state) => state.movies);

  if (movies.length == 0) {
    return null;
  }

  return (
    <div className="text-center">
      <Carousel className="my-2 bg-light">
        {movies.map((movie) => (
          <Carousel.Item key={`movie-carousel-${movie.id}`}>
            <img
              src={movie.image}
              alt={`${movie.title} image`}
              style={{ objectFit: "cover" }}
              height={400}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default MovieCarousel;
