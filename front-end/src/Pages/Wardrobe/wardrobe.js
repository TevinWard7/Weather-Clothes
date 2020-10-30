import React, { useEffect, useReducer, useState } from "react";
import db from "../../utils/firebase";
import Pusher from "pusher-js";
import { useStateValue } from "../../utils/stateProvider";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { IconButton } from "@material-ui/core";
import "./wardobe.css";

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

    // const addOutfit = () => {
    //     wardrobeRef.add(
    //         {
    //             uid: user.uid,
    //             outfit: "coolfit",
    //             shoes: "balenci"
    //         }
    //     )
    // };

    return(
        <div className="wardobe-page">
            {outfits ? 
            outfits.map(outfit => 
            <div>
                <h3>{outfit.outfit}</h3>
            </div>) 
            : <p>no outfits</p>}

       {/* <button onClick={addOutfit}>new wardrobe</button> */}
       <IconButton><AddOutlinedIcon /></IconButton>

        </div>
    )
};

export default Wardrobe;