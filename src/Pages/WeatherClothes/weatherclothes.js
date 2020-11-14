import React, {useState, useEffect} from "react";
import "./weatherclothes.css";
import { Button } from "@material-ui/core";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import API from "../../utils/API";

const WeatherClothes = () => {

    const [{ user }, dispatch] = useStateValue();
    const [location, setLocation] = useState();

    useEffect(() => {

        db
        .collection("city")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setLocation(snapshot.docs.map((doc) => doc.data().city)))

    },[user.uid])

    useEffect(() => {
        API.search(location)
        .then(res => console.log(res))
    },[location])


    return(
        <div className="page-content">

            {/* <h3>{location}</h3> */}

            <ul className="day-list">

                <Button variant="outlined" size="large"><li id="monday">M</li></Button>
                <Button variant="outlined" size="large"><li id="tuesday">T</li></Button>
                <Button variant="outlined" size="large"><li id="wednsday">W</li></Button>
                <Button variant="outlined" size="large"><li id="thursday">T</li></Button>
                <Button variant="outlined" size="large"><li id="friday">F</li></Button>
                <Button variant="outlined" size="large"><li id="saturday">S</li></Button>
                <Button variant="outlined" size="large"><li id="sunday">S</li></Button>

            </ul>
    
            <div className="container">

                <div className="row text-center">

                    <div className="col-12">

                        Weather Icon, Temperature

                    </div>
                    
                </div>

                <div className="row text-center">

                    <div className="col"></div>

                    <div className="col">

                        <ul className="clothes-list">

                            <li>clothes1 <span>name</span></li>
                            <li>clothes1 <span>name</span></li>
                            <li>clothes1 <span>name</span></li>

                        </ul>

                    </div>

                    <div className="col"></div>

                </div>
        
            </div>

        </div>
    )
};

export default WeatherClothes;