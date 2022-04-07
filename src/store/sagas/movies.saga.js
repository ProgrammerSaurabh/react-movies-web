import axios from "axios";
import { put } from "redux-saga/effects";
import { types } from "../actions/types";

export function* loadMovies() {
  try {
    const { data } = yield axios.get(`${process.env.REACT_APP_API_URL}/movies`);

    yield put({ type: types.LOAD_MOVIES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.LOAD_MOVIES_ERROR, payload: error });
  }
}

export function* loadMovie({ payload }) {
  try {
    const { data } = yield axios.get(
      `${process.env.REACT_APP_API_URL}/movies/${payload}`
    );

    yield put({ type: types.LOAD_MOVIE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.LOAD_MOVIE_ERROR, payload: error });
  }
}
