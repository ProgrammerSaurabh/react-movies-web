import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Image,
  Container,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Back from "../../components/Back";
import { loading, loadMovie } from "../../store/actions/movies.actions";
import {
  loading as bookingLoading,
  storeBooking,
} from "../../store/actions/bookings.actions";

import styles from "./MovieDetail.module.css";
import toast from "react-hot-toast";
import moment from "moment";

function MovieDetail() {
  const { movie: movieId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    movie,
    loading: loading_,
    error,
  } = useSelector((state) => state.movies);
  const { loading: bookingLoading_ } = useSelector((state) => state.bookings);

  const [date, setDate] = useState("");
  const [price, setPrice] = useState(0);
  const [users, setUsers] = useState(1);

  useEffect(() => {
    if (movieId) {
      dispatch(loading());
      dispatch(loadMovie(movieId));
    }
  }, [movieId]);

  const price_ = typeof movie?.prices !== "object" ? movie?.prices : 0;

  const date_ =
    movie?.type == "event"
      ? moment(movie?.date, "DD MMMM YYYY").format("YYYY-MM-DD")
      : moment
          .max(moment(), moment(movie?.release_date, "DD MMMM YYYY"))
          .format("YYYY-MM-DD");

  useEffect(() => {
    if (price_ > 0) {
      setPrice(price_);
    }
  }, [price_]);

  useEffect(() => {
    if (date_) {
      setDate(date_);
    }
  }, [date_]);

  const bookingHandler = () => {
    if (price === 0) {
      return toast.error("Please select type");
    }

    if (users < 1) {
      return toast.error("Please select atleast one person");
    }

    if (date.length === 0) {
      return toast.error("Please select date");
    }

    if (moment(date).isBefore(date_)) {
      return toast.error("Please select a valid date");
    }

    dispatch(bookingLoading());
    dispatch(
      storeBooking({
        data: { movieId, price, users, date, total: price * users },
        onSuccess: (id) => {
          toast.success("Booking added successfully");
          navigate(`/bookings/${id}`);
        },
      })
    );
  };

  return (
    <Container className="my-4">
      <Back to={"/"}>Back to home</Back>
      {loading_ ? (
        <Loader text="Loading movie" />
      ) : error ? (
        <h4 className="h4 py-2 text-center">Error</h4>
      ) : (
        movie && (
          <Card.Body className="shadow">
            <Row>
              <Col
                xs={12}
                md={12}
                lg={3}
                className={"text-center mb-4 mb-lg-0"}
              >
                <Image src={movie.image} thumbnail />
              </Col>
              <Col xs={12} md={12} lg={9}>
                <h3 className="h3">{movie.title}</h3>
                <p className="mb-0">
                  <em>Genre:</em> <span>{movie.genre}</span>
                </p>
                {movie.director && (
                  <p className="mb-0">
                    <em>Director:</em> <span>{movie.director}</span>
                  </p>
                )}
                {movie.date && (
                  <p className="mb-0">
                    <em>Date:</em> <span>{movie.date}</span>
                  </p>
                )}
                {movie.duration && (
                  <p className="mb-0">
                    <em>Duration:</em> <span>{movie.duration}</span>
                  </p>
                )}
                {movie.release_date && (
                  <p className="mb-0">
                    <em>Release date:</em> <span>{movie.release_date}</span>
                  </p>
                )}
                {movie.ratings && (
                  <p className="mb-0">
                    <em>Ratings:</em> <span>{movie.ratings} / 5</span>
                  </p>
                )}
                <p className="mb-2">
                  <em>Stars:</em> <span>{movie.stars}</span>
                </p>
                {movie.plot && <p className="mb-0">{movie.plot}</p>}
                {typeof movie.prices === "object" ? (
                  <div className="d-flex justify-content-start align-items-center my-2">
                    {Object.keys(movie.prices).map((type) => (
                      <small
                        key={`movie-price-${type}`}
                        className={`${styles.movie__price} ${
                          movie.prices[type] == price
                            ? styles.movie__price_active
                            : ""
                        }`}
                        onClick={() => {
                          if (!bookingLoading_) {
                            setPrice(movie.prices[type]);
                          }
                        }}
                      >
                        {type}
                        <span>&nbsp;for {movie.currency}</span>
                        <span className="h5">{movie.prices[type]}</span>
                      </small>
                    ))}
                  </div>
                ) : (
                  <small
                    className={`${styles.movie__price} ${styles.movie__price_active} mb-2`}
                  >
                    <span>{movie.currency}</span>
                    <span className="h5">{movie.prices}</span>
                  </small>
                )}
                <div className="d-flex justify-content-start align-items-start align-lg-items-center gap-1">
                  <div className="d-inline-block">
                    <Form.Control
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      disabled={bookingLoading_ || movie?.type == "event"}
                      placeholder="Movie date"
                      min={date_}
                    />
                  </div>
                  <div className="d-inline-block">
                    <Form.Control
                      type="number"
                      value={users}
                      onChange={(e) => {
                        if (parseInt(e.target.value) >= 1) {
                          setUsers(e.target.value);
                        }
                      }}
                      disabled={bookingLoading_}
                      placeholder="Number of persons"
                    />
                  </div>
                  {!bookingLoading_ ? (
                    <Button
                      type="button"
                      variant="success"
                      className="px-4 py-1"
                      onClick={() => bookingHandler()}
                    >
                      <small>
                        Book
                        {price * users > 0 ? (
                          <>
                            <span>&nbsp;for {movie.currency}&nbsp;</span>
                            <span className="h5">{price * users}</span>
                          </>
                        ) : null}
                      </small>
                    </Button>
                  ) : (
                    <Button variant="primary" disabled>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      &nbsp; Booking...
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Card.Body>
        )
      )}
    </Container>
  );
}

export default MovieDetail;
