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
    const history = useHistory();
    // Get colleection from firebase
    const wardrobeRef = db.collection("wardrobe");
    const [outfitName, setOutfitName] = useState();
    const [fitImage, setFitImage] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [fitWeather, setFitWeather] = useState();
    console.log(fitWeather)

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

        alert("uploaded!")

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
                        <h3>Enter Outfit</h3>
                        <input type="text" placeholder="Outfit" 
                        onChange={(e) => setOutfitName(e.target.value)}></input>
                        <br/>
                        <br/>

                        <input type="file" accept="image/*" onChange={(event) => setFitImage(event.target.files[0])} id="img-upload"></input>
                        <button onClick={(event) => {handleImgUpload(event)}} id="upload-button">Upload</button>
                        <br/>
                        <br/>

                        {// Get Weather description input for oufit
                        }
                        <select className="custom-select" onChange={(e) => {
                            setFitWeather(e.target.value)
                        }}>
                            <option value="clear Sky">Clear Sky</option>
                            <option value="overcast">Overcast</option>
                            <option value="rain">Rain</option>
                            <option value="sunny">Sunny</option>
                        </select>

                        <select>
                            <option>Neutral</option>
                            <option>Hot</option>
                            <option>Cold</option>
                        </select>

                        <br/>
                        <br/>

                        {// If there is am outfit name allow submit button else disable it
                        }
                        {
                        !outfitName ? 
                        <Button disabled>Submit</Button>
                        :
                        <Button onClick={() => addOutfit()}>Submit</Button>
                        }
                        
                    </form>

                </div>

            </div>

            <div className="row"></div>

        </div>
        
        )

};

export default AddOutfit;