import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { applyMiddleware, createStore } from "redux";

import Home from "./pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";

import rootReducer from "./store/reducers";

import LatestMovies from "./pages/LatestMovies";
import MovieDetail from "./pages/MovieDetail";
import BookingDetail from "./pages/BookingDetail";
import UpcomingMovies from "./pages/UpcomingMovies";
import Events from "./pages/Events";

import { Toaster } from "react-hot-toast";

import { rootSaga } from "./store/sagas";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const routes = (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route exact element={<Home />} path={"/"} />
      <Route element={<LatestMovies />} path={"/latest-movies"} />
      <Route element={<UpcomingMovies />} path={"/upcoming-movies"} />
      <Route element={<Events />} path={"/nearby-events"} />
      <Route element={<MovieDetail />} path={"/movies/:movie"} />
      <Route element={<BookingDetail />} path={"/bookings/:booking"} />
    </Routes>
    <Toaster />
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>{routes}</React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
