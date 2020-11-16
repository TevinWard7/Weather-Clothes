import React, { useState, useEffect } from "react";
import "./location.css";
import { useStateValue } from "../../utils/stateProvider";
import { Button } from "@material-ui/core";
import db from "../../utils/firebase";


const Location = () => {

    const [{ user }, dispatch] = useStateValue();
    const [initialCity, setInitialCity] = useState("City");
    const [newCity, setNewCity] = useState();
    const [id, setId] = useState();
    console.log("Location -> id", id)
    const cityRef = db.collection("city").where('uid', '==', user.uid);

    // Pull user's city from the database
    useEffect(() => {

        cityRef.onSnapshot(snapshot => {

            const data = snapshot.docs.map((doc) => doc.data())

            // If the DB has a city store it else log no city
            if (data[0]) {
                setInitialCity(data[0].city)
            } else {
                console.log("no city from db")
            }
        })
        
    },[cityRef, user.uid])

    // Pull ID of the doc from firebase
    useEffect(() => {

        db
        .collection("city")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                setId(doc.id)

            });
        });

    },[user.uid])

    // Send new city input into databae
    const addCity = (newCity) => {

        db.collection("city")
        .add({
            uid: user.uid,
            city: newCity,
        })
        .then(
            alert("Saved")
        )

    };

    // Update city in db according to new user input
    const updateCity = (id, newCity) => {

        db
        .collection("city")
        .doc(id)
        .update({
            city: newCity
        })
        .then(
            alert("Updated")
        )

    };

    return(
        <div className="container location-page">

            <div className="row text-center">

                <div className="col">

                    <h1>Enter City</h1>

                    <div>

                        <input placeholder={initialCity || "City"} onChange={(e) => setNewCity(e.target.value)} />
                    
                    </div>

                    <div>

                        {
                        
                        (()=> {

                            if (newCity && initialCity === "City") {

                                return <Button onClick={() => addCity(newCity)}>Submit</Button>;
            
                            }    

                            if (!newCity || newCity === initialCity ) {

                                return <Button disabled>Submit</Button>;}   

                            if (initialCity && initialCity != newCity) {

                                return <Button onClick={() => updateCity(id, newCity)}>Update</Button>

                        }

                        })()
                        }
                    
                    </div>
                    

                </div>

            </div>
        
            <div className="row text-center">

                <div className="col"></div>

            </div>
        
        </div>
    )

};

export default Location;