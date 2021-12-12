import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginError: null,
    loginLoading: false,
    avatar: null,
};

const name = 'users';

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        registerUserRequest(state, action) {
            state.registerLoading = true;
        },
        registerUserSuccess(state, {payload: userData}) {
            state.user = userData;
            state.registerLoading = false;
            state.registerError = null;
        },
        registerUserFailure(state, {payload: error}) {
            state.registerLoading = false;
            state.registerError = error;
        },
        facebookUserRequest(state, action) {
            state.loginLoading = true;
        },
        googleUserRequest(state, action) {
            state.loginLoading = false;
        },
        loginUserRequest(state, action) {
            state.loginLoading = true;
        },
        loginUserSuccess(state, {payload: userData}) {
            state.loginLoading = false;
            state.user = userData;
            state.loginError = null;
        },
        loginUserFailure(state, action) {
            state.loginError = action.payload;
            state.loginLoading = false;
        },
        logoutUserRequest(state, action) {

        },
        logoutUser(state, action) {
            state.user = null;
            state.avatar = null;
        },
        avatarUser(state, action) {
          state.avatar = action.payload;
        },
        clearErrorUser(state, action) {
            state.registerError = null;
            state.loginError = null
        },
    }
});

export default usersSlice;