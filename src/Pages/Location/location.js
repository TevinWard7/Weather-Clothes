import React, { useState, useEffect } from "react";
import "./location.css";
import { useStateValue } from "../../utils/stateProvider";
import { actionTypes } from "../../utils/reducer";
import { Button } from "@material-ui/core";

const Location = () => {

    const [{ city }, dispatch] = useStateValue();
    const [location, setLocation] = useState("City");

    console.log(city)

    // Send city info to data layer
    const dispatchCity = () => {

        dispatch({
            type: actionTypes.SET_CITY,
            city: location
        })

    };

    return(
        <div className="container">

            <div className="row text-center">

                <div className="col">
                    <h3>Enter City</h3>
                    <div><input placeholder={city || "city"} onChange={(e) => setLocation(e.target.value)} />

                    {
                    !location? 
                    <Button disabled>Submit</Button>
                    :
                    <Button onClick={() => dispatchCity()}>Submit</Button>
                    }

                    </div>
                </div>

            </div>
        
        </div>
    )

};

export default Location;