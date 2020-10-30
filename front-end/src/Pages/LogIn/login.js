import React from "react";
import { Button } from "@material-ui/core";
import "./login.css";
import { auth, provider } from "../../firebase.js"

const LogIn = () => {

    const signIn = () => {
        auth
        .signInWithPopup(provider).then(result => {
            console.log(result)
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