import React from "react";
import "./addoutfit.css"

const AddOutfit = () => {

    return(
        <div className="row">

            <div className="col"></div>

            <div className="col">

            <form className="clothing-inputs">

                <label for="tops">Tops</label><br/>
                <input type="text" name="top-name"></input>

                <input type="file" name="top-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>

                <br/>

                <label for="bottoms">Bottoms</label><br/>    
                <input type="text" name="bottoms"></input>

                <input type="file" name="bottom-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>

                <br/>

                <label for="shoes">Shoes</label><br/>    
                <input type="text" name="shoes"></input>

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