import React, {useState, useEffect} from "react";
import "./weatherclothes.css";
import { Button } from "@material-ui/core";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import API from "../../utils/API";
import Sun from "./images/sun.png";
import Cloudy from "./images/clouds.png";
import Rain from "./images/rain.png";
import Breakaway from "./images/breakaway.png";

const WeatherClothes = () => {

    const [{ user }, dispatch] = useStateValue();
    const [location, setLocation] = useState();
    const [todaysTemp, setTodaysTemp] = useState();
    const [todayDescript, setTodayDescript] = useState();
    const [weatherIcon, setWeatherIcon] = useState();

    // Get location data from DB
    useEffect(() => {

        db
        .collection("city")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setLocation(snapshot.docs.map((doc) => doc.data().city)))

    },[user.uid])

    // Get weather data from API based on city from DB
    useEffect(() => {
        API.search(location)
        .then((res) => {
            setTodaysTemp(res.data.list[0].main.temp)
            setTodayDescript(res.data.list[0].weather[0].description)
        })
    },[location])

    // Set weatherIcon state according to weather description from API
    useEffect(() => {

        switch (todayDescript) {

            case "light rain" || "moderate rain":

                setWeatherIcon(Rain)

                break;
            
            case "clear sky":

                setWeatherIcon(Sun)

                break;
            
            case "overcast clouds":

                setWeatherIcon(Cloudy)

                break;
            
            case "broken clouds":

                setWeatherIcon(Breakaway)
                
                break;
        
            default:
                break;
        }

    },[todayDescript])

    // Convery kelvin temp to faranheight
    const kelvinToFaran = (kelvin) => {
        return (kelvin - 273.15) * 9/5 + 32
    };

    return(

        <div className="container main-page">

            <ul className="row day-list">

                <Button size="large"><li className="days" id="monday">M</li></Button>
                <Button size="large"><li className="days" id="tuesday">T</li></Button>
                <Button size="large"><li className="days" id="wednsday">W</li></Button>
                <Button size="large"><li className="days" id="thursday">T</li></Button>
                <Button size="large"><li className="days" id="friday">F</li></Button>
                <Button size="large"><li className="days" id="saturday">S</li></Button>
                <Button size="large"><li className="days" id="sunday">S</li></Button>

            </ul>
    
            <div className="my-container">

                <div className="row text-center">

                    <div className="col-12"></div>
                    
                </div>

                <div className="row text-center">

                    <div className="col">

                    {
                            (()=> {

                            if (typeof todaysTemp === "number") {

                                const temperature = Math.round(kelvinToFaran(todaysTemp)) + "°";

                                return (
                                    <>
                                        <div>{temperature}<img src={weatherIcon} id="weather-icon" alt="icon" /></div>
                                    </>
                                )
                            }
                            else {
                                console.log("no temp")
                            }
                            })()
                        }

                    </div>

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