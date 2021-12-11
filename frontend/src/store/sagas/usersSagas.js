import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {historyPush} from "../actions/historyActions";
import {toast} from "react-toastify";
import {
    avatarUser,
    facebookUserRequest,
    loginUserFailure,
    loginUserRequest,
    loginUserSuccess, logoutUser,
    registerUserFailure,
    registerUserRequest,
    registerUserSuccess
} from "../actions/usersActions";
import {apiURL} from "../../config";


export function* registerUserSaga(data) {
    try {
        const response = yield axiosApi.post('/users', data.payload);
        yield put(registerUserSuccess(response.data));
        yield put(historyPush('/'));
        toast.success('Register successfully');
    } catch (e) {
        toast.error(e.response.data.global);
        yield put(registerUserFailure(e.response.data));
    }
}

export function* loginUserSaga(data) {
    try {
        const response = yield axiosApi.post('/users/sessions', data.payload);
        yield put(loginUserSuccess(response.data.user));

        if (response.data.user.image) {
            yield put(avatarUser(apiURL + '/uploads/' + response.data.user.image));
        }

        yield put(historyPush('/'));
        toast.success('Login successfully');
    } catch (e) {
        toast.error(e.response.data.global);
        yield put(loginUserFailure(e.response.data));
    }
}

export function* facebookUserSaga(data) {
    try {
        const response = yield axiosApi.post('/users/facebookLogin', data.payload);
        yield put(loginUserSuccess(response.data.user));
        yield put(avatarUser(data.picture.data.url));
        yield put(historyPush('/'));
        toast.success('Login successfully');
    } catch (e) {
        toast.error(e.response.data.global);
        yield put(loginUserFailure(e.response.data));
    }
}

export  function* loginOut(getState) {
    try {
        yield axiosApi.delete('/users/sessions', {
            headers: {
                'Authorization': getState().users.user && getState().users.user.token,
            },
        })
        yield put(logoutUser());
        yield put(historyPush('/'));
    } catch (e) {

    }
}

const userSaga = [
    takeEvery(registerUserRequest, registerUserSaga),
    takeEvery(loginUserRequest, loginUserSaga),
    takeEvery(facebookUserRequest, facebookUserSaga),
    takeEvery(logoutUser, loginOut)
];

export default userSaga;