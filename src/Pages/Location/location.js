import React, { useState } from "react";
import "./location.css";
import { useStateValue } from "../../utils/stateProvider";

const Location = () => {

    const [{ user }, dispatch] = useStateValue();
    const [location, setLocation] = useState("City");

    return(
        <div className="container">

            <div className="row text-center">

                <div className="col">
                    <h3>Enter City</h3>
                    <div><input placeholder={location} onChange={(e) => setLocation(e.target.value)} /></div>
                </div>

            </div>
        
        </div>
    )

};

export default Location;