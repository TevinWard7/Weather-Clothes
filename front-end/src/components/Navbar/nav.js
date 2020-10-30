import React, { useState } from "react";
import "./nav.css";
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
import { IconButton } from "@material-ui/core";

const Navbar = () => {

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
            <div><IconButton id="gear" onClick={toggleNav}><SettingsSharpIcon /></IconButton></div>
            
                <ul className={`nav-links ${navActive === "true" ? "nav-active" : ""}`} fadein={fadeIn} onAnimationEnd={() => {setFadeIn(0)}}>
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