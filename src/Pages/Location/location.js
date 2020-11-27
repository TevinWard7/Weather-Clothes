import React, { useState, useEffect } from "react";
import "./location.css";
import { useStateValue } from "../../utils/stateProvider";
import { Button } from "@material-ui/core";
import db from "../../utils/firebase";
import { Toast, Row, Col } from 'react-bootstrap';


const Location = () => {

    const [{ user }, dispatch] = useStateValue();
    const [initialCity, setInitialCity] = useState("City");
    const [newCity, setNewCity] = useState();
    const [id, setId] = useState();
    console.log("Location -> id", id)
    const cityRef = db.collection("city").where('uid', '==', user.uid);
    const [show, setShow] = useState(false);

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

    //eslint-disable-next-line        
    },[])

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

    //eslint-disable-next-line
    },[])

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
            setShow(true)
        )

    };

    return(
        <div className="location-page">

            {/* <Row>
                <Col xs={12}> */}

                    <Toast className="toastie" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Header>
                        </Toast.Header>
                        <Toast.Body>Updated!</Toast.Body>
                    </Toast>

                {/* </Col>
            </Row> */}

            <div className="row text-center">

                <div className="col enter-city">

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
        
            <div className="row"></div>

        </div>
    )

};

export default Location;