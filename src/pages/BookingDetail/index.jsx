import React, { useEffect } from "react";
import { Col, Row, Image, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Back from "../../components/Back";
import Loader from "../../components/Loader";
import { loadBooking, loading } from "../../store/actions/bookings.actions";
import QRCode from "react-qr-code";

function BookingDetail() {
  const { booking: bookingId } = useParams();
  const dispatch = useDispatch();

  const {
    loading: loading_,
    booking,
    error,
  } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (bookingId) {
      dispatch(loading());
      dispatch(loadBooking(bookingId));
    }
  }, [bookingId]);

  return (
    <Container className="my-4">
      <Back to={"/"}>Back to home</Back>
      {loading_ ? (
        <Loader text="Loading booking details..." />
      ) : error ? (
        <h4 className="h4 py-2 text-center">Error</h4>
      ) : (
        booking?.movie && (
          <Card.Body className="shadow">
            <Row>
              <Col xs={1} md={3}>
                <Image src={booking?.movie.image} thumbnail />
              </Col>
              <Col xs={1} md={9}>
                <h3 className="h3">{booking?.movie?.title}</h3>
                <p className="mb-0">
                  <em>Genre:</em> <span>{booking?.movie?.genre}</span>
                </p>
                {booking?.movie?.director && (
                  <p className="mb-0">
                    <em>Director:</em> <span>{booking?.movie?.director}</span>
                  </p>
                )}
                {booking?.movie?.date && (
                  <p className="mb-0">
                    <em>Date:</em> <span>{booking?.movie?.date}</span>
                  </p>
                )}
                <p className="mb-2">
                  <em>Stars:</em> <span>{booking?.movie?.stars}</span>
                </p>
                <p className="mb-2">
                  <em>Total:</em>{" "}
                  <span>
                    {booking?.movie?.currency}
                    <span className="h5">{booking?.total}</span>
                    &nbsp;(
                    {booking?.users} persons * {booking?.movie?.currency}
                    {booking?.price}
                    {typeof booking?.movie?.prices === "object" && (
                      <span style={{ textTransform: "capitalize" }}>
                        &nbsp;(
                        {Object.keys(booking?.movie?.prices).find(
                          (_) => booking?.movie?.prices[_] == booking?.price
                        )}
                        )
                      </span>
                    )}
                    )
                  </span>
                </p>
                <QRCode
                  value={`${window.location.origin}/bookings/${booking.id}`}
                />
              </Col>
            </Row>
          </Card.Body>
        )
      )}
    </Container>
  );
}

export default BookingDetail;
