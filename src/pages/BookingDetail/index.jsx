import React, { useEffect } from "react";
import {
  Col,
  Row,
  Image as BImage,
  Container,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Back from "../../components/Back";
import Loader from "../../components/Loader";
import { loadBooking, loading } from "../../store/actions/bookings.actions";
import QRCode from "react-qr-code";

import moment from "moment";

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

  const downloadQrCode = () => {
    const svg = document.querySelector("svg");
    if (booking && svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `${booking?.movie?.title}-Movie-QRCode`;
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

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
                <BImage src={booking?.movie.image} thumbnail />
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
                {booking?.date && (
                  <p className="mb-0">
                    <em>Date:</em>{" "}
                    <span>
                      {moment(booking?.date).format("ddd, Do MMMM, YYYY")}
                    </span>
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
                <div className="d-inline-flex justify-content-start flex-column">
                  <QRCode
                    value={`${window.location.origin}/bookings/${booking.id}`}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="small"
                    className="my-2"
                    onClick={() => downloadQrCode()}
                  >
                    Download QRCode
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        )
      )}
    </Container>
  );
}

export default BookingDetail;
