import React, { useState } from "react";
import "./addoutfit.css";
import { useStateValue } from "../../utils/stateProvider";
import db from "../../utils/firebase";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const AddOutfit = () => {

    // Get loggedin user info
    const [{ user }, dispatch] = useStateValue();
    // Get colleection from firebase
    const wardrobeRef = db.collection("wardrobe");
    let history = useHistory();

    const [outfitName, setOutfitName] = useState();
    console.log("AddOutfit -> outfitName", outfitName)
    // const [topName, setTopName] = useState();
    // console.log("AddOutfit -> topName", topName)
    // const [outerWearName, setOuterWearName] = useState();
    // console.log("AddOutfit -> outerWearName", outerWearName)
    // const [accesoriesName, setAccesoriesName] = useState();
    // console.log("AddOutfit -> accesoriesName", accesoriesName)
    // const [bottomName, setBottomName] = useState();
    // console.log("AddOutfit -> bottomName", bottomName)
    // const [shoesName, setShoesName] = useState();
    // console.log("AddOutfit -> shoesName", shoesName)


    const addOutfit = () => {
        wardrobeRef.add(
            {
                uid: user.uid,
                outfit: outfitName,
                // shoes: "balenci"
            }
        ).then(history.push('/wardrobe'))
    };

    return(
        <div className="row text-center page-content">

            <div className="col">
                
                <form>

                {//Outfit Name Entry
                }
                <input type="text" placeholder="Outfit name" 
                onChange={(e) => setOutfitName(e.target.value)}></input>
                <br/>
                <br/>
                {//Shirt Entry
                }
                {/* <input type="text" placeholder="Top"
                name="top-name" onChange={(e) => setTopName(e.target.value)}></input>
                <input type="file" name="top-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>
                <br/>
                <br/> */}
                {//Outer Wear Entry
                }
                {/* <input type="text" placeholder="Outer Wear"
                name="outerwear-name" onChange={(e) => setOuterWearName(e.target.value)}></input>
                <input type="file" name="outer-wear-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>
                <br/>
                <br/> */}
                {//Accesories Entry
                }
                {/* <input type="text" placeholder="Accesories"
                name="accesories-name" onChange={(e) => setAccesoriesName(e.target.value)}></input>
                <input type="file" name="accesories-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>
                <br/>
                <br/> */}
                {//Bottom Entry
                }
                {/* <input type="text" placeholder="Bottoms" name="bottoms" onChange={(e) => setBottomName(e.target.value)}></input>
                <input type="file" name="bottom-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>
                <br/>
                <br/> */}
                {//Shoes Entry
                }
                {/* <input type="text" placeholder="Shoes" name="shoes" onChange={(e) => setShoesName(e.target.value)}></input>
                <input type="file" name="shoe-image" id="fileToUpload"></input>
                <input type="submit" value="Upload Image" name="submit"></input>
                <br/>
                <br/> */}

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

                    {
                    !outfitName ? 
                    <Button disabled>Submit</Button>
                    :
                    <Button onClick={addOutfit}>Submit</Button>
                    }
                    

                    </form>
            
            </div>

        </div>

        
    )

};

export default AddOutfit;