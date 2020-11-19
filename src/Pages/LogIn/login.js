import React, {useEffect} from "react";
import { Button } from "@material-ui/core";
import "./login.css";
import { auth, provider } from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import { actionTypes } from "../../utils/reducer";
import sunImg from "./images/sun.png";
import catImg from "./images/cat.png";
import anime from 'animejs/lib/anime.es.js';

const LogIn = () => {

    useEffect(() => {



        anime({
            targets: '.login-container > h1',
            keyframes: [
                {opacity: 0},
                {opacity: 10},
                {opacity: 20},
                {opacity: 30},
                {opacity: 40},
                {opacity: 50},
                {opacity: 60},
                {opacity: 70},
                {opacity: 80},
                {opacity: 90},
                {opacity: 100}
              ],
              duration: 10500,
              easing: 'easeInQuad'
          });

    },[])

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
        <div className="login" scroll="no">

            <div className="login-container">

                <p>Weather Wear</p>
                <h1 style={{opacity: 0}}>WW</h1>
                <Button onClick={signIn}>Sign In</Button>
                <div><img src={sunImg} alt="sun-icon" id="sun" /></div>
                <div><img id="model" src={catImg} alt="model" /></div>

            </div>

        </div>
    )
};

export default LogIn;