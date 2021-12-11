import usersSlice from "../slices/usersSlice";

export const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
    facebookUserRequest,
    loginUserRequest,
    loginUserSuccess,
    loginUserFailure,
    avatarUser,
    logoutUser,
} = usersSlice.actions;
