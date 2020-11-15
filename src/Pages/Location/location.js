import React, { useState, useEffect } from "react";
import "./location.css";
import { useStateValue } from "../../utils/stateProvider";
import { Button } from "@material-ui/core";
import db from "../../utils/firebase";


const Location = () => {

    const [{ user }, dispatch] = useStateValue();
    const [initialCity, setInitialCity] = useState();
    console.log("Location -> initialCity", initialCity)
    const [newCity, setNewCity] = useState();
    const [id, setId] = useState();
    console.log("Location -> cityDocId", id)

    // Pull user's city from the database
    useEffect(() => {

        db
        .collection("city")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setInitialCity(snapshot.docs.map((doc) => doc.data())))

    },[user.uid])

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

    };

    const updateCity = (id, newCity) => {

        db
        .collection("city")
        .doc(id)
        .update({
            city: newCity
        })

    };

    return(
        <div className="container">

            <div className="row text-center">

                <div className="col">

                    <h3>Enter City</h3>
                    <div>
                        <input placeholder={initialCity ? initialCity[0].city : "City"} onChange={(e) => setNewCity(e.target.value)} />

                    </div>

                </div>

            </div>
        
            <div className="row text-center">

                <div className="col">
                    
                    {
                    
                    (()=> {

                        !initialCity ? setInitialCity([{city: "City"}]) : console.log("cool")

                        const {city} = initialCity[0]


                        if (!newCity || newCity === city ) {

                            return <Button disabled>Submit</Button>;} 
                        
                        if (newCity && !city) {

                            return <Button onClick={() => addCity(newCity)}>Submit</Button>;
        
                        }      

                        if (city && city != newCity) {

                            return <Button onClick={() => updateCity(id, newCity)}>Update</Button>

                    }

                    })()}
                    
                </div>

            </div>
        
        </div>
    )

};

export default Location;