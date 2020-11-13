import React, { useState, useEffect } from "react";
import "./location.css";
import { useStateValue } from "../../utils/stateProvider";
import { actionTypes } from "../../utils/reducer";
import { Button } from "@material-ui/core";
import db from "../../utils/firebase";

const Location = () => {

    const [{ user }, dispatch] = useStateValue();
    const [location, setLocation] = useState("City");

    useEffect(() => {

        db
        .collection("city")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setLocation(snapshot.docs.map((doc) => doc.data())))

    },[user.uid])

    // Send city info to databae
    const addCity = () => {

        db.collection("city")
        .add({
            uid: user.uid,
            city: location,
        })

    };

    return(
        <div className="container">

            <div className="row text-center">

                <div className="col">
                    <h3>Enter City</h3>
                    <div>
                        <input placeholder={location[0].city || "city"} onChange={(e) => setLocation(e.target.value)} />

                    {
                    !location? 
                    <Button disabled>Submit</Button>
                    :
                    <Button onClick={() => addCity()}>Submit</Button>
                    }

                    </div>
                </div>

            </div>
        
        </div>
    )

};

export default Location;