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

                <div className="col-12 outfits">
                    {outfits ? 
                    outfits.map(outfit => 
                        <ul>
                            <li><h3>{outfit.outfit}</h3></li>
                        </ul>) 
                    : <p>no outfits</p>}
                </div>

            </div>

            <div className="row text-center">

                <div className="col">
                        <h3>Add New</h3>
                        <IconButton href="/add">
                            <AddOutlinedIcon />
                        </IconButton>
                </div>
            </div>
        </div>
    )
};

export default Wardrobe;