import React, { useState } from "react";
import "./nav.css";
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
import { IconButton, Avatar } from "@material-ui/core";
import { useStateValue } from "../../utils/stateProvider";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { auth } from "../../utils/firebase";
import { Button } from "@material-ui/core";

const Navbar = () => {

    // Get User info from data layer
    const [{ user }] = useStateValue();
    // Determine if nav pop is open/closed
    const [navActive, setNavActive] = useState("false");
    // Determine annimation
    const [fadeIn, setFadeIn] = useState(0);
    const history = useHistory();
    
    // Toggle Our Navigation Bar
    const toggleNav = () => {

        if (navActive === "true") {
            setNavActive("false")
            setFadeIn(0)
        } else {
            setNavActive("true")
            setFadeIn(1)
        }

    };

    // Click handle events for nav links
    const linkAction = (link) => {

        switch (link) {
            case "/":
                history.push("/")
                break;

            case "/wardrobe":
                history.push("/wardrobe")
                break;

            case "/add":
                history.push("/add")
                break;
            
            case "/location":
                history.push("/location")
                break;    
        
            default:
                break;
        }
        
        toggleNav();
    };

    const signOut = () => {
        auth.signOut()
    };

    return(
        <header>

            <nav>

                <div className="bar">

                    <IconButton id="gear" onClick={toggleNav}><SettingsSharpIcon /></IconButton>
                    <p>{moment().format("MMM Do YY")}</p>

                </div>

                <ul className={`nav-links ${navActive === "true" ? "nav-active" : ""}`} fadein={fadeIn} onAnimationEnd={() => {setFadeIn(0)}}>
                    
                    <li><Avatar src={user.photoURL}/></li>
                    <li onClick={() => linkAction("/")}>Home</li>
                    <li onClick={() => linkAction("/location")}>Location</li>
                    <li onClick={() => linkAction("/wardrobe")}>Wardrobe</li>
                    <li><Button id="sign-out" onClick={signOut}>Sign Out</Button></li>

                </ul>
                    
            </nav>
            
        </header>
    )
}

export default Navbar;