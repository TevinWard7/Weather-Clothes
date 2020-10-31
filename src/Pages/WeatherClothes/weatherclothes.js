import React from "react";
import "./weatherclothes.css";
import { Button } from "@material-ui/core";

const WeatherClothes = () => {

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