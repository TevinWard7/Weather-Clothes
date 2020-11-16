import React, { useState, useEffect } from "react";
import "./nav.css";
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
import { IconButton, Avatar } from "@material-ui/core";
import { useStateValue } from "../../utils/stateProvider";
import { useHistory } from "react-router-dom";

const Navbar = () => {

    // Get User info from data layer
    const [{ user }, dispatch] = useStateValue();
    // Determine if nav pop is open/closed
    const [navActive, setNavActive] = useState("false");
    // Determine annimation
    const [fadeIn, setFadeIn] = useState(0);
    const [location, setLocation] = useState();
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

    return(
        <div className="my-container">

            <nav>
                <div>
                    <IconButton id="gear" onClick={toggleNav}><SettingsSharpIcon /></IconButton>
                </div>
                
                    <ul className={`nav-links ${navActive === "true" ? "nav-active" : ""}`} fadein={fadeIn} onAnimationEnd={() => {setFadeIn(0)}}>
                        <li><Avatar src={user.photoURL}/></li>
                        <li onClick={() => linkAction("/")}>Home</li>
                        <li onClick={() => linkAction("/location")}>Location</li>
                        <li onClick={() => linkAction("/wardrobe")}>Wardrobe</li>
                    </ul>
                    
            </nav>
            
            <div id="date"><h5>today's date</h5></div>
            
        </div>
    )
}

export default Navbar;