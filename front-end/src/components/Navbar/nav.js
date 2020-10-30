import React, { useState } from "react";
import "./nav.css";
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
import { IconButton, Avatar } from "@material-ui/core";
import { useStateValue } from "../../stateProvider";

const Navbar = () => {
    const [{ user }, dispatch] = useStateValue();
    console.log(user)
    // Determine if nav pop is open/closed
    const [navActive, setNavActive] = useState("false");
    // Determine annimation
    const [fadeIn, setFadeIn] = useState(0);

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

    return(
        <div className="my-container">
            <nav>
            <div>
                <IconButton id="gear" onClick={toggleNav}><SettingsSharpIcon /></IconButton>
            </div>
            
                <ul className={`nav-links ${navActive === "true" ? "nav-active" : ""}`} fadein={fadeIn} onAnimationEnd={() => {setFadeIn(0)}}>
                    <li><Avatar src={user.photoURL}/></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/wardrobe">Wardrobe</a></li>
                    <li><a href="/add">Add Outfit</a></li>
                </ul>
                
            </nav>
            
            <div id="date"><p>today's date</p></div>
        </div>
    )
}

export default Navbar;