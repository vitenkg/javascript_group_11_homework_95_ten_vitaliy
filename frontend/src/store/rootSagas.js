import {all} from "redux-saga/effects";
// import tempSagas from "./sagas/tempSagas";
import registerUserSaga from "./sagas/usersSagas";
import facebookUserSaga from "./sagas/usersSagas";
import loginUserSaga from "./sagas/usersSagas";

export function* rootSagas() {
    yield all([
        // ...tempSagas,
        ...registerUserSaga,
        ...loginUserSaga,
        ...facebookUserSaga,
    ])
}