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
        registerUserFailure(state, action) {
            state.registerLoading = false;
            state.registerError = action.payload;
        },
        facebookUserRequest(state, action) {

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
        logoutUser(state, action) {
            state.user = null;
            state.avatar = null;
        },
        avatarUser(state, action) {
          state.avatar = action.payload;
        },
    }
});

export default usersSlice;