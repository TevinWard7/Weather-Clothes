import React, {useState, useEffect} from "react";
import "./weatherclothes.css";
import { Button } from "@material-ui/core";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import API from "../../utils/API";

const WeatherClothes = () => {

    const [{ user }, dispatch] = useStateValue();
    const [location, setLocation] = useState();
    const [todaysTemp, setTodaysTemp] = useState();

    useEffect(() => {

        db
        .collection("city")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setLocation(snapshot.docs.map((doc) => doc.data().city)))

    },[user.uid])

    useEffect(() => {
        API.search(location)
        .then(res => setTodaysTemp(res.data.list[0].main.temp))
    },[location])


    const kelvinToFaran = (kelvin) => {
        return (kelvin - 273.15) * 9/5 + 32
    };


    return(
        <div className="page-content">

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
 
                        {
                            (()=> {

                            if (typeof todaysTemp === "number") {

                                const temperature = Math.round(kelvinToFaran(todaysTemp)) + "°";

                                return (
                                    <>
                                        <div>{temperature}</div>
                                        <div>Weather Icon</div> 
                                    </>
                                )
                            }
                            else {
                                console.log("no temp")
                            }
                            })()
                        }

                    </div>
                    
                </div>

                <div className="row text-center">

                    <div className="col"></div>

                    <div className="col">

                        outfit

                    </div>

                    <div className="col"></div>

                </div>
        
            </div>

        </div>
    )
};

export default WeatherClothes;