import axios from "axios";
import toast from "react-hot-toast";
import { put } from "redux-saga/effects";
import { types } from "../actions/types";

export function* storeBooking({ payload }) {
  try {
    const { data } = yield axios.post(
      `${process.env.REACT_APP_API_URL}/transactions`,
      payload.data
    );

    yield put({ type: types.STORE_BOOKING_SUCCESS });

    if (payload.onSuccess && typeof payload.onSuccess === "function") {
      payload.onSuccess(data.id);
    }
  } catch (error) {
    toast.error("Error");
    yield put({ type: types.STORE_BOOKING_ERROR, payload: error });
  }
}

export function* loadBooking({ payload }) {
  try {
    const { data } = yield axios.get(
      `${process.env.REACT_APP_API_URL}/transactions/${payload}?_expand=movie`
    );

    yield put({ type: types.LOAD_BOOKING_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.LOAD_BOOKING_ERROR, payload: error });
  }
}
