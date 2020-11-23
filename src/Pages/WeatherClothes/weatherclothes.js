import React, {useState, useEffect} from "react";
import "./weatherclothes.css";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import moment from "moment";
import API from "../../utils/API";

const WeatherClothes = () => {

    const [{ user }, dispatch] = useStateValue();
    const [location, setLocation] = useState();
    const [todaysTemp, setTodaysTemp] = useState();
    const [todayDescript, setTodayDescript] = useState();
    const [weekDay, setWeekDay] = useState();

    // Convert kelvin temp to faranheight
    const kelvinToFaran = (kelvin) => {
        return (kelvin - 273.15) * 9/5 + 32
    };

    // Location, Weather & Weekday Data fetching
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

    //eslint-disable-next-line
    },[])

    useEffect(() => {

        // Get outfits from DB
        db
        .collection("wardrobe")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => {

            const fits = snapshot.docs.map((doc) => doc.data())
            const fitNum = fits.length
            const randomFitNum = (Math.floor(Math.random() * fitNum));

            // let hotFits = fits.filter(fit => fit.temperature === "hot");
            console.log(fits.filter(fit => fit.temperature === "hot"))

        })

    //eslint-disable-next-line
    },[]);

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
                                // console.log("no temperture found")
                                return <div></div>
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