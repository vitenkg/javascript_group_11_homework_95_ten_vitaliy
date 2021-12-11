import {takeEvery, put} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export function* tempSagas() {
    try {
        const response = yield axiosApi.get('/temp');
        yield put (fetchTempSuccess(response.data))
    } catch (e) {
        toast.error('Fetch to temp failed');
        yield put (fetchTempFailure());
    }
}

export default [
    takeEvery(FETCH_TEMP_REQUEST, tempSagas),

]