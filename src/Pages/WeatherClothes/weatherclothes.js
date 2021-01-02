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
    // const [todayDescript, setTodayDescript] = useState();
    const [weekDay, setWeekDay] = useState();
    const [outfit, setOutfit] = useState("No Outfit Loading (out of API calls)");
    const outfitSavedDay = localStorage.getItem("today");
    let dayCheck;

    // Location, Weather & Weekday Data fetching
    useEffect(() => {

        // Get location data from DB
        db
        .collection("city")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setLocation(snapshot.docs.map((doc) => doc.data().city)))

        // Get & set the day of the week
        setWeekDay(moment().format('dddd'));

    //eslint-disable-next-line
    },[])

    useEffect(() => {

        // Get weather data from API based on city from DB
        API.search(location)
        .then((res) => {
            console.log(res)
            setTodaysTemp(res.data.list[0].main.temp)
        })

    },[location])

    useEffect(() => {

        console.log(moment().format('dddd'))
        console.log("outfitsaved day --->" + outfitSavedDay)


        if (moment().format('dddd') != outfitSavedDay) {
            console.log("days dont match!")
            localStorage.removeItem("todaysOutfit");
            localStorage.removeItem("today");
            return
        }
        else {
            
            console.log("Days DO match!")
        }

        dayCheck = true;

        
    }, [weekDay, outfitSavedDay])

    
    useEffect(() => {

        const savedOutfit = localStorage.getItem("todaysOutfit");

        // Get outfits from DB
        const determineOutfit = () => {

            db
            .collection("wardrobe")
            .where('uid', '==', user.uid)
            .onSnapshot(snapshot => {

                const fits = snapshot.docs.map((doc) => doc.data())
                let hotFits = fits.filter(fit => fit.temperature === "hot");
                let neutralFits = fits.filter(fit => fit.temperature === "neutral");
                let coldFits = fits.filter(fit => fit.temperature === "cold");

                if (todaysTemp => 70) {
                    const hotfitNum = hotFits.length
                    const randomHotFitNum = (Math.floor(Math.random() * hotfitNum));
                    setOutfit(hotFits[randomHotFitNum].image);
                    localStorage.setItem("todaysOutfit", hotFits[randomHotFitNum].image)
                    localStorage.setItem("today", weekDay)
                }
                if (todaysTemp > 70 && todaysTemp > 68) {
                    const randomNeutralFitNum = (Math.floor(Math.random() * neutralFits.length));
                    setOutfit(neutralFits[randomNeutralFitNum].image);
                    localStorage.setItem("todaysOutfit", neutralFits[randomNeutralFitNum].image)
                    localStorage.setItem("today", weekDay)
                }
                if (todaysTemp > 68 ) {
                    const randomColdFitNum = (Math.floor(Math.random() * coldFits.length));
                    setOutfit(coldFits[randomColdFitNum].image)
                    localStorage.setItem("todaysOutfit", coldFits[randomColdFitNum].image)
                    localStorage.setItem("today", weekDay)
                }

            });

        };

        // If there is an outfit saved in local storage set it to Outfit state else determine a new one
        savedOutfit ? setOutfit(savedOutfit) : determineOutfit()

        console.log(savedOutfit)
        

    //eslint-disable-next-line
    },[weekDay, dayCheck]);


    return(

        <div className="container">

            {
                // Row 1 - Weekdays list
            }
            <div className="row">
                
                <div className="col-12">

                    <ul className="day-list">

                        <li className={weekDay === "Monday" ? "current-day" : "days"}>M</li>
                        <li className={weekDay === "Tuesday" ? "current-day" : "days"}>T</li>
                        <li className={weekDay === "Wednesday" ? "current-day" : "days"}>W</li>
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

                <div className="col"></div>

                <div className="col">

                    <h1>Today's Outfit</h1>
                    <hr />
                    <img src={outfit} alt="oufit" height="300px" width="auto"/>

                </div>

                <div className="col"></div>

            </div>

        </div>
        
    )
};

export default WeatherClothes;