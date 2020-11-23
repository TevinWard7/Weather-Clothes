import React, {useState, useEffect} from "react";
import "./weatherclothes.css";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import moment from "moment";
import API from "../../utils/API";

const WeatherClothes = () => {

    const [{ user }, dispatch] = useStateValue();
    const [location, setLocation] = useState();
    // const [outfits, setOutfits] = useState();
    const [todaysTemp, setTodaysTemp] = useState();
    // const [todayDescript, setTodayDescript] = useState();
    // const [weatherIcon, setWeatherIcon] = useState();
    const [weekDay, setWeekDay] = useState();
    

    // Fetch data from DB
    useEffect(() => {

        // Get outfits from DB
        db
        .collection("wardrobe")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => {

            const fits = snapshot.docs.map((doc) => doc.data());
            const fitNum = fits.length
            const randomFitNum = (Math.floor(Math.random() * fitNum));
            console.log(randomFitNum)

        })

        // Get location data from DB
        db
        .collection("city")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setLocation(snapshot.docs.map((doc) => doc.data().city)))


    },[user.uid]);

    // Get weather data from API based on city from DB
    useEffect(() => {

        const abortController = new AbortController()
        const signal = abortController.signal

        API.search(location, { signal: signal })
        .then((res) => {
            console.log(res)
            setTodaysTemp(res.data.list[0].main.temp)
            setTodayDescript(res.data.list[0].weather[0].description)
        })

        
        const cleanup = () => {
            abortController.abort()
        }

        cleanup()

    },[location])

    // Set weatherIcon state according to weather description from API

    // useEffect(() => {

    //     switch (todayDescript) {

    //         case "light rain" || "moderate rain":

    //             setWeatherIcon(Rain)

    //             break;
            
    //         case "clear sky":

    //             setWeatherIcon(Sun)

    //             break;
            
    //         case "overcast clouds":

    //             setWeatherIcon(Cloudy)

    //             break;
            
    //         case "broken clouds" || "scattered clouds":

    //             setWeatherIcon(Breakaway)
                
    //             break;
        
    //         default:
    //             break;
    //     }

    // },[todayDescript])

    // Convert kelvin temp to faranheight
    const kelvinToFaran = (kelvin) => {
        return (kelvin - 273.15) * 9/5 + 32
    };


    // useEffect(() => {
    //     shuffleArray(outfits)
    // },[outfits])

    // const shuffleArray = (arr) => {
    //     console.log(arr[0])
    //     console.log(arr.length * Math.floor(Math.random()))
        
    // };


     // Get the day of the week
     useEffect(() => {
        setWeekDay(moment().format('dddd'))
    },[setWeekDay])

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