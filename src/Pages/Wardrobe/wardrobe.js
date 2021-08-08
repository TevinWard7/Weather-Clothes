import React, { useEffect, useState, useContext } from "react";
import db from "../../utils/firebase";
import { useStateValue } from "../../utils/stateProvider";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { IconButton } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";
import "./wardrobe.css"
// import ClearIcon from '@material-ui/icons/Clear';
import hanger from "../../images/hanger.png";
import closet from "../../images/closet.png";
import { UserContext } from "../../utils/UserContext";
import garmetsBck from "../../images/garmets.png";

const Wardrobe = () => {

    // Get loggedin user info
    const [{ user }] = useStateValue();
    const [outfits, setOutfits] = useState();
    const history = useHistory();
    const {setBck} = useContext(UserContext);

    // Get outfits
    useEffect(() => {

        setBck(`url(${garmetsBck})`);
        
        db
        .collection("wardrobe")
        .where('uid', '==', user.uid)
        .onSnapshot(snapshot => setOutfits(snapshot.docs.map((doc) => doc)))

    //eslint-disable-next-line
    },[]);

    const removeFit = (theDoc) => {

        const confirmDelete = window.confirm("are you sure?");

        if (confirmDelete) {
            db
            .collection("wardrobe")
            .doc(theDoc)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
                
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
        else {
            console.log("good save")
        }

    };

    const Arrows = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black", color: "green" }}
            onClick={onClick}
          />
        );
    };

    const settings = {
        className: "fits",
        dots: false,
        infinite: true,
        arrows: true,
        prevArrow: <Arrows />,
        nextArrow: <Arrows />,
        swipe: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

    return(
        <div className="wardrobe-page">

            <div className="text-center slide">

                    <Slider {...settings}>

                    {
                    outfits ? 
                        outfits.map(doc =>   
                    <div key={doc.id}>
                        <h1 id="fit-name">{doc.data().outfit}</h1>

                        <IconButton key={doc.id} onClick={() => removeFit(doc.id)}>
                            {/* <ClearIcon fontSize="small" /> */}
                            <img src={hanger} alt="hanger" width="25" height="25" id="hang"/>
                        </IconButton>
                        
                        <img src={doc.data().image} alt="outfit" id="fit-pic"/> 
                    </div>
                    ) 
                    : 
                    <p>Add outfits</p>
                    }

                    </Slider>
                
            </div>

            <div className="add-fit">
                <img src={closet} alt="closet"/><br/>
                <IconButton onClick={() => history.push("/add")}><AddOutlinedIcon /></IconButton>
                <p>Add Outfit</p>
            </div>

            {/* <div className="dim"></div> */}

        </div>
    )
};

export default Wardrobe;