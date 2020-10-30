import React, { useEffect, useReducer, useState } from "react";
import db from "../../utils/firebase";
import Pusher from "pusher-js";
import { useStateValue } from "../../utils/stateProvider";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { IconButton } from "@material-ui/core";
import "./wardrobe.css";

const Wardrobe = () => {

    // Get loggedin user info
    const [{ user }, dispatch] = useStateValue();
    // Get colleection from firebase
    const wardrobeRef = db.collection("wardrobe");
    const [outfits, setOutfits] = useState();
    console.log("Wardrobe -> outfits", outfits)

    
    useEffect(() => {

        db
        .collection("wardrobe")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setOutfits(snapshot.docs.map((doc) => doc.data())))
        
    },[user.uid]);

    return(
        <div className="container wardrobe-page">

            <div className="row">
                <div className="col">
                    {outfits ? 
                    outfits.map(outfit => 
                    <div className="outfits">
                     <h3>{outfit.outfit}</h3>
                     </div>) 
                    : <p>no outfits</p>}
                </div>
                <div className="col">
                    <IconButton href="/add">
                        <AddOutlinedIcon />
                    </IconButton>
                </div>
            </div>
            

       {/* <button onClick={addOutfit}>new wardrobe</button> */}
       

        </div>
    )
};

export default Wardrobe;