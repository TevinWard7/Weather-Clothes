import React from "react";
import "./addoutfit.css"

const AddOutfit = () => {

    return(
        <div className="text-center">

            <ul className="clothing-inputs">
                <li>
                    <select>
                        <option>Casual</option>
                        <option>Work</option>
                        <option>Event</option>
                    </select>
                </li>
                <li>
                    <select>
                        <option>Hot</option>
                        <option>Cold</option>
                    </select>
                </li>
                <li>
                    <select>
                        <option>Rain</option>
                        <option>None</option>
                    </select>
                </li>
            </ul>

        </div>
    )

};

export default AddOutfit;