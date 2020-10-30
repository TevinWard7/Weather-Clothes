import React from "react";
import "./weatherclothes.css";

const WeatherClothes = () => {

    return(
        <div className="page-content">

    <ul className="day-list">
        <li id="monday">M</li>
        <li id="tuesday">T</li>
        <li id="wednsday">W</li>
        <li id="thursday">T</li>
        <li id="friday">F</li>
        <li id="saturday">S</li>
        <li id="sunday">S</li>
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

export default WeatherClothes