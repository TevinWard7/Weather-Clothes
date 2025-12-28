import React, {useState, useEffect, useContext} from "react";
import "./weatherclothes.css";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import moment from "moment";
import API from "../../utils/API";
import { UserContext } from "../../utils/UserContext";
import info from "../../images/info.png";

const WeatherClothes = () => {

    const [{ user }] = useStateValue();
    const [location, setLocation] = useState();
    const [todaysTemp, setTodaysTemp] = useState();
    // const [todayDescript, setTodayDescript] = useState();
    const [weekDay, setWeekDay] = useState();
    const [outfit, setOutfit] = useState();
    const outfitSavedDay = localStorage.getItem("today");
    // const [dayCheck, setDayCheck] = useState();
    const [noFits, setNoFits] = useState();
    const {setBck, setInfoPop, setInfoContent} = useContext(UserContext);

    // Location, Weather & Weekday Data fetching
    useEffect(() => {

        setBck("-webkit-linear-gradient(150deg, #ecdfd100 50%, #fcf3ed 50%)");

        // Get location data from DB
        const unsubscribe = db
        .collection("city")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setLocation(snapshot.docs.map((doc) => doc.data().city)))

        // Get & set the day of the week
        setWeekDay(moment().format('dddd'));

        // Cleanup function
        return () => unsubscribe();

    //eslint-disable-next-line
    },[])

    useEffect(() => {

        // Get weather data from API based on city from DB
        API.search(location)
        .then((res) => {
            setTodaysTemp(res.data.list[0].main.temp)
        })

    },[location])

    useEffect(() => {

        if (moment().format('dddd') !== outfitSavedDay) {
            localStorage.removeItem("todaysOutfit");
            localStorage.removeItem("today");
            return
        }

    }, [weekDay, outfitSavedDay])

    const determineOutfit = (hotFits, neutralFits, coldFits) => {

        if (!todaysTemp) setOutfit("No Outfit Loading (out of API calls)");
        else {
            // Convert Kelvin to Fahrenheit
            const tempF = (todaysTemp - 273.15) * 9/5 + 32;

            if (tempF >= 70) {
                const hotfitNum = hotFits.length;
                const randomHotFitNum = (Math.floor(Math.random() * hotfitNum));
                setOutfit(hotFits[randomHotFitNum].image);
                localStorage.setItem("todaysOutfit", hotFits[randomHotFitNum].image);
                localStorage.setItem("today", weekDay);
            }
            else if (tempF >= 68 && tempF < 70) {
                const randomNeutralFitNum = (Math.floor(Math.random() * neutralFits.length));
                setOutfit(neutralFits[randomNeutralFitNum].image);
                localStorage.setItem("todaysOutfit", neutralFits[randomNeutralFitNum].image);
                localStorage.setItem("today", weekDay);
            }
            else if (tempF < 68) {
                const randomColdFitNum = (Math.floor(Math.random() * coldFits.length));
                setOutfit(coldFits[randomColdFitNum].image);
                localStorage.setItem("todaysOutfit", coldFits[randomColdFitNum].image);
                localStorage.setItem("today", weekDay);
            }
        }

    };

    const storeDbVals = (snapshot) => {
        const fits = snapshot.docs.map((doc) => doc.data());
        const hotFits = fits.filter(fit => fit.temperature === "hot");
        const neutralFits = fits.filter(fit => fit.temperature === "neutral");
        const coldFits = fits.filter(fit => fit.temperature === "cold");
        determineOutfit(hotFits, neutralFits, coldFits);
    };

    // Get outfits from DB
    const queryDb = () => {

        const unsubscribe = db
        .collection("wardrobe")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => {

            const snap = snapshot.docs.map((doc) => doc.data());

            if (snap.length === 0) {
                setNoFits(true);
            }
            if (snap.length > 0) {
                setNoFits(false);
                storeDbVals(snapshot)
            }

        });

        return unsubscribe;

    };
    
    useEffect(() => {

        const savedOutfit = localStorage.getItem("todaysOutfit");

        // If there is an outfit saved in local storage set it to Outfit state else determine a new one
        if (savedOutfit) {
            setOutfit(savedOutfit);
        } else {
            const unsubscribe = queryDb();
            // Cleanup function
            return () => unsubscribe();
        }

    //eslint-disable-next-line
    },[]);

    const todaysFit = () => {
        if (noFits === true) {
            return (
            <div className="how" onClick={() => {setInfoPop("block"); setInfoContent("how");}}>
                <h3>How to</h3>&nbsp;<img src={info} alt="info" width="15" heigh="15"/>
            </div>
            )
        }
        if (noFits === false) {
            return (
            outfit === "No Outfit Loading (out of API calls)" ? <p>{outfit}</p> 
            :
            <img src={outfit} alt="oufit" height="300px" width="auto"/>
            )
        }                
    };


    return(

        <>
            <div className="container">
                {
                    // Row 1 - Weekdays list
                }
                <div className="row text-center">
                    
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
                        {todaysFit()}

                    </div>

                    <div className="col"></div>

                </div>

                <div className="day-page"></div>

            </div>
        </>
        
    )
};

export default WeatherClothes;