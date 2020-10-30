import React from "react";
import { Button } from "@material-ui/core";
import "./login.css";
import { auth, provider } from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import { actionTypes } from "../../utils/reducer";

const LogIn = () => {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        })
        .catch(err => console.log(err.message))
    };

    return(
        <div className="login">
            <div className="login-container">
                <div>Welcome</div>
                <h2>WW</h2>
                <Button onClick={signIn}>Sign In</Button>
            </div>
        </div>
    )
};

export default LogIn;