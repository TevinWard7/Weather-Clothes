import React, { useState } from "react";
import "./addoutfit.css"

const AddOutfit = () => {

    const [topName, setTopName] = useState();
    const [bottomName, setBottomName] = useState();
    const [shoesName, setShoesName] = useState();
    console.log(topName)

    return(
        <div className="row">

            <div className="col"></div>

            <div className="col">

            <form className="clothing-inputs">

                Outfit
                <br/>
                <br/>

                <label for="tops">Top</label><br/>
                <input type="text" name="top-name" onChange={(e) => setTopName(e.target.value)}></input>

                <input type="file" name="top-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>

                <br/>

                <label for="bottoms">Bottom</label><br/>    
                <input type="text" name="bottoms" onChange={(e) => setBottomName(e.target.value)}></input>

                <input type="file" name="bottom-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>

                <br/>

                <label for="shoes">Shoes</label><br/>    
                <input type="text" name="shoes" onChange={(e) => setShoesName(e.target.value)}></input>

                <input type="file" name="shoe-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>

                <br/>

                <br/>

                    <select>
                        <option>Casual</option>
                        <option>Work</option>
                        <option>Event</option>
                    </select>

                    <select>
                        <option>Neutral</option>
                        <option>Hot</option>
                        <option>Cold</option>
                    </select>

                    <select>
                        <option>Dry</option>
                        <option>Rain</option>
                    </select>
            </form>
            
            </div>

            <div className="col"></div>

        </div>

        
    )

};

export default AddOutfit;