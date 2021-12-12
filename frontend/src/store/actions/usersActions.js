import usersSlice from "../slices/usersSlice";

export const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
    facebookUserRequest,
    googleUserRequest,
    loginUserRequest,
    loginUserSuccess,
    loginUserFailure,
    avatarUser,
    logoutUserRequest,
    logoutUser,
    clearErrorUser,
} = usersSlice.actions;
