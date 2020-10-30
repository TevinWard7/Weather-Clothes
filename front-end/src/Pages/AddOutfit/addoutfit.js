import React, { useState } from "react";
import "./addoutfit.css"

const AddOutfit = () => {

    const [topName, setTopName] = useState();
    console.log("AddOutfit -> topName", topName)
    const [outerWearName, setOuterWearName] = useState();
    console.log("AddOutfit -> outerWearName", outerWearName)
    const [accesoriesName, setAccesoriesName] = useState();
    console.log("AddOutfit -> accesoriesName", accesoriesName)
    const [bottomName, setBottomName] = useState();
    console.log("AddOutfit -> bottomName", bottomName)
    const [shoesName, setShoesName] = useState();
    console.log("AddOutfit -> shoesName", shoesName)

    return(
        <div className="row text-center page-content">

            <div className="col">
                
                <form action="/wardrobe">
                {//Outfit Name Entry
                }
                <input type="text" placeholder="Outfit name"></input>
                <br/>
                <br/>
                {//Shirt Entry
                }
                <input type="text" placeholder="Top"
                name="top-name" onChange={(e) => setTopName(e.target.value)}></input>
                <input type="file" name="top-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>
                <br/>
                <br/>
                {//Outer Wear Entry
                }
                <input type="text" placeholder="Outer Wear"
                name="outerwear-name" onChange={(e) => setOuterWearName(e.target.value)}></input>
                <input type="file" name="outer-wear-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>
                <br/>
                <br/>
                {//Accesories Entry
                }
                <input type="text" placeholder="Accesories"
                name="accesories-name" onChange={(e) => setAccesoriesName(e.target.value)}></input>
                <input type="file" name="accesories-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>
                <br/>
                <br/>
                {//Bottom Entry
                }
                <input type="text" placeholder="Bottoms" name="bottoms" onChange={(e) => setBottomName(e.target.value)}></input>
                <input type="file" name="bottom-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>
                <br/>
                <br/>
                {//Shoes Entry
                }
                <input type="text" placeholder="Shoes" name="shoes" onChange={(e) => setShoesName(e.target.value)}></input>
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
                    <br/>
                    <br/>
                    <input type="submit" value="Submit"></input>
                    </form>
            
            </div>

        </div>

        
    )

};

export default AddOutfit;