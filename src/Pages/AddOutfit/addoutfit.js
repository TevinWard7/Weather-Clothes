import React, { useState } from "react";
import "./addoutfit.css";
import { useStateValue } from "../../utils/stateProvider";
import db from "../../utils/firebase";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { storage } from "../../utils/firebase";

const AddOutfit = () => {

    // Get loggedin user info
    const [{ user }, dispatch] = useStateValue();
    // Get colleection from firebase
    const wardrobeRef = db.collection("wardrobe");
    const history = useHistory();
    const [outfitName, setOutfitName] = useState();
    const [fitImage, setFitImage] = useState();
    const [imgUrl, setImgUrl] = useState();

    const handleImgUpload = (event) => {

        event.preventDefault()

        // Upload image to firestore and store in variable
        const uploadTask = storage.ref(`images/${fitImage.name}`).put(fitImage);

        // Get url of image just uploaded to firestore storage
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error)
            },
            () => {
                storage
                .ref("images")
                .child(fitImage.name)
                .getDownloadURL()
                .then(url =>
                    setImgUrl(url)
                )
            }
        )

        addOutfit();

    };

    const addOutfit = () => {
        wardrobeRef.add(
            {
                uid: user.uid,
                outfit: outfitName,
                image: imgUrl
            }
        ).then(history.push('/wardrobe'))
    };

    return(

        <div className="add-page">

            <div className="row text-center">

                <div className="col">
                    
                    <form>

                        {//Outfit Name Entry
                        }
                        <input type="text" placeholder="Outfit" 
                        onChange={(e) => setOutfitName(e.target.value)}></input>
                        <br/>
                        <br/>

                        {/* <select>
                            <option value="casual">Casual</option>
                            <option value="work">Work</option>
                            <option value="event">Event</option>
                        </select> */}

                        <input type="file" accept="image/*" onChange={(event) => setFitImage(event.target.files[0])}></input>
                        <br/>
                        <br/>

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
                        <Button onClick={(event) => {handleImgUpload(event)}}>Submit</Button>
                        }
                        
                    </form>

                </div>

            </div>

            <div className="row"></div>
        </div>
        
        )

};

export default AddOutfit;