import React from 'react';
import FacebookLoginButton from "react-facebook-login/dist/facebook-login-render-props";
import FacebookIcon from '@material-ui/icons/Facebook';
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {facebookAppId} from "../../../config";
import {facebookUserRequest} from "../../../store/actions/usersActions";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const facebookResponse = response => {
        console.log(response);
        dispatch(facebookUserRequest(response.payload));
    };

    return (
        <FacebookLoginButton
            appId={facebookAppId}
            fields="name, email,picture"
            render={props => (
                <Button
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<FacebookIcon/>}
                onClick={props.onClick}
                >
                    Login with Facebook
                </Button>
            )}
            callback={facebookResponse}
        />
    );
};

export default FacebookLogin;