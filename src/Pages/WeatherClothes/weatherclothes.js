import React, {useState, useEffect} from "react";
import "./weatherclothes.css";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import moment from "moment";
import API from "../../utils/API";

const WeatherClothes = () => {

    const [{ user }] = useStateValue();
    const [location, setLocation] = useState();
    const [todaysTemp, setTodaysTemp] = useState();
    const [todayDescript, setTodayDescript] = useState();
    console.log("WeatherClothes -> todayDescript", todayDescript)
    const [weekDay, setWeekDay] = useState();
    const [outfit, setOutfit] = useState("No Outfit Loading (out of API calls)");
    console.log("WeatherClothes -> outfit", setOutfit)

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
            console.log(res)
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
            let hotFits = fits.filter(fit => fit.temperature === "hot");
            // let neutralFits = fits.filter(fit => fit.temperature === "neutral");
            // let coldFits = fits.filter(fit => fit.temperature === "cold");

            // if (todaysTemp => 70) {
                const hotfitNum = hotFits.length
                const randomHotFitNum = (Math.floor(Math.random() * hotfitNum));
                console.log(hotFits[randomHotFitNum])
            // }

        })

    //eslint-disable-next-line
    },[]);

    return(

        <div className="container">

            {
                // Row 1 - Weekdays list
            }
            <div className="row">
LLLL
                <div className="col-12">

                    <ul className="day-list">

                        <li className={weekDay === "Monday" ? "current-day" : "days"}>M</li>
                        <li className={weekDay === "Tuesday" ? "current-day" : "days"}>T</li>
                        <li className={weekDay === "Wednsday" ? "current-day" : "days"}>W</li>
                        <li className={weekDay === "Thursday" ? "current-day" : "days"}>T</li>
                        <li className={weekDay === "Friday" ? "current-day" : "days"}>F</li>
                        <li className={weekDay === "Saturday" ? "current-day" : "days"}>S</li>
                        <li className={weekDay === "Sunday" ? "current-day" : "days"}>S</li>

                    </ul>

                </div>
                
            </div>

            {
                // Row 2 - Outfit for today
            }
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

                        {outfit}

                </div>

                <div className="col">

                </div>

            </div>

        </div>
        
    )
};

export default WeatherClothes;