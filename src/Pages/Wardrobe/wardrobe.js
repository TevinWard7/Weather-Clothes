import React, { useEffect, useState } from "react";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { IconButton } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";
import "./wardrobe.css"
import ClearIcon from '@material-ui/icons/Clear';

const Wardrobe = () => {

    // Get loggedin user info
    const [{ user }, dispatch] = useStateValue();
    const [outfits, setOutfits] = useState();
    const history = useHistory();

    useEffect(() => {
        
        db
        .collection("wardrobe")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setOutfits(snapshot.docs.map((doc) => doc)))

    },[user.uid]);

    const removeFit = (theDoc) => {

        db
        .collection("wardrobe")
        .doc(theDoc)
        .delete()
        .then(() => {
            console.log("Document successfully deleted!");
            
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

    };

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
          />
        );
      }

    const settings = {
        className: "fits",
        dots: true,
        infinite: true,
        arrows: true,
        prevArrow: <SamplePrevArrow />,
        swipe: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
      };

    return(
        <div>

            <div className="row text-center">

                <div className="col-12">

                    <Slider {...settings}>

                    {
                    outfits ? 
                        outfits.map(doc =>   
                    <div>
                        <IconButton onClick={() => removeFit(doc.id)}>
                            <ClearIcon fontSize="small"/>
                        </IconButton>
                        <h3>{doc.data().outfit}</h3>
                        <div><img src={doc.data().image} alt="outfit" id="fit-pic" /></div>
                    </div>
                    ) 
                    : <div>
                        <p>no outfits</p>
                    </div>
                    }

                    </Slider>

                </div>
                
            </div>

            <div className="add-fit">

                <div>
                    <IconButton onClick={() => history.push("/add")}><AddOutlinedIcon /></IconButton>
                    <h3>Add Outfit</h3>
                </div>

            </div>

        </div>
    )
};

export default Wardrobe;