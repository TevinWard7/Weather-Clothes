import React, {useState, useEffect} from "react";
import "./weatherclothes.css";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import moment from "moment";
import API from "../../utils/API";

const WeatherClothes = () => {

    const [{ user }, dispatch] = useStateValue();
    const [location, setLocation] = useState();
    // const [outfits, setOutfits] = useState(["example", "example2"]);
    const [todaysTemp, setTodaysTemp] = useState();
    const [todayDescript, setTodayDescript] = useState();
    const [weekDay, setWeekDay] = useState();

    // Data fetching
    useEffect(() => {

        // Get location data from DB
        db
        .collection("city")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setLocation(snapshot.docs.map((doc) => doc.data().city)))

        // Get weather data from API based on city from DB
        API.search(location)
        .then((res) => {
            // console.log(res)
            setTodaysTemp(res.data.list[0].main.temp)
            setTodayDescript(res.data.list[0].weather[0].description)
        })

        // Get & set the day of the week
        setWeekDay(moment().format('dddd'))

        // Get outfits from DB
        db
        .collection("wardrobe")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => {

            snapshot.docs.map((doc) => doc.data())
            // const fitNum = fits.length
            // const randomFitNum = (Math.floor(Math.random() * fitNum));

            // fits.map(fit => {
            //     const fitTemps = fit.tempertature
            //     console.log(fitTemps.fiter())
            // })

        })

    //eslint-disable-next-line
    },[]);

    // Convert kelvin temp to faranheight
    const kelvinToFaran = (kelvin) => {
        return (kelvin - 273.15) * 9/5 + 32
    };

    const clothesTempSelect = (array) => {

        const heatCheck = (weather) => {
            return weather === "hot";
        }

        const neautralCheck = (weather) => {
            return weather === "hot";
        }

        const coldCheck = (weather) => {
            return weather === "hot";
        }

        if (todaysTemp > 70) {
            array.filter(heatCheck)
        }
        if (todaysTemp === 70) {
            array.filter(neautralCheck)
        }
        if (todaysTemp < 70) {
            array.filter(coldCheck)
        }
            
    }

    return(

        <div className="container main-page">

            <ul className="row day-list">

                <li className={weekDay === "Monday" ? "current-day" : "days"}>M</li>
                <li className={weekDay === "Tuesday" ? "current-day" : "days"}>T</li>
                <li className={weekDay === "Wednsday" ? "current-day" : "days"}>W</li>
                <li className={weekDay === "Thursday" ? "current-day" : "days"}>T</li>
                <li className={weekDay === "Friday" ? "current-day" : "days"}>F</li>
                <li className={weekDay === "Saturday" ? "current-day" : "days"}>S</li>
                <li className={weekDay === "Sunday" ? "current-day" : "days"}>S</li>

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
                                        <div>{temperature}</div>
                                    </>
                                )
                            }
                            else {
                                console.log("no temperture found")
                            }
                            })()
                        }

                    </div>

                    <div className="col">

                        outfit

                    </div>

                    <div className="col"></div>

                </div>

                <div className="row">
                    
                    {/* <div className="break">{weatherIcon ? <img id="weather-icon" src={weatherIcon} alt="icon"></img> : console.log("noimg")}</div> */}
                   
                </div>
                
            </div>

        </div>
        
    )
};

export default WeatherClothes;