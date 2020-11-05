import React, { useEffect, useState } from "react";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { IconButton } from "@material-ui/core";
import "./wardrobe.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wardrobe = () => {

    // Get loggedin user info
    const [{ user }, dispatch] = useStateValue();
    console.log("User ->", user)
    const [outfits, setOutfits] = useState();
    console.log("Wardrobe -> outfits", outfits)

    
    useEffect(() => {

        db
        .collection("wardrobe")
        .where('uid', '==', user.uid)
        // .orderBy('createdAt')
        .onSnapshot(snapshot => setOutfits(snapshot.docs.map((doc) => doc.data())))
        
    },[user.uid]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return(
        <>
            <Slider {...settings}>

                {outfits ? 
                    outfits.map(outfit => 
                <div>
                    <h3>{outfit.outfit}</h3>
                </div>) 
                : <div>
                    <p>no outfits</p>
                </div>}

            </Slider>

            <div>
                <IconButton href="/add"><AddOutlinedIcon /></IconButton>
                <h3>Add Outfit</h3>
            </div>
        </>
    )
};

export default Wardrobe;