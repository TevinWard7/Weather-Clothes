import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar/nav";
import WeatherClothes from "./Pages/WeatherClothes/weatherclothes";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import AddOutfit from './Pages/AddOutfit/addoutfit';
import Wardrobe from './Pages/Wardrobe/wardrobe';
import Location from "./Pages/Location/location";
import LogIn from "./Pages/LogIn/login";
import { useStateValue } from "./utils/stateProvider";
import { auth } from "./utils/firebase";
import { actionTypes } from "./utils/reducer";
import { CircularProgress } from "@material-ui/core";
import { UserContext } from './utils/UserContext';
import { Button } from "@material-ui/core";
// import zIndex from '@material-ui/core/styles/zIndex';

const App = () => {

  const [{ user }, dispatch] = useStateValue();
  const [fetching, setFetching] = useState();
  const [bck, setBck] = useState();
  const [infoPop, setInfoPop] = useState("none");

  useEffect(() => { 

    setFetching(true)
    // Check to see if user is logged in via firebase persistence
    auth.onAuthStateChanged(userSaved => {
      dispatch({
        type: actionTypes.SET_USER,
        // If there's a user send user info to data layer (will be null if no persistence user)
        user: userSaved
    })
    setFetching(false)
    })

  },[dispatch])

  // const toggleInfo = () => {
  //   if (infoPop === "none") setInfoPop("block");
  //   if (infoPop === "block") setInfoPop("none");
  // };

  return (
    <div className="app" style={{backgroundImage: bck, height:"100vh", width:"100vw", zIndex:"2"}}>
      {
      !user ? (fetching ? (<div id="loader"><CircularProgress /></div>): (<LogIn />)) : (
        
        <Router>

          <div>
            <UserContext.Provider value={{setBck, setInfoPop}}>

              <div style={{display:infoPop, zIndex:999}} className="info-pop">
                <ul>
                  <li><h2>1. Enter Your Location</h2></li>
                  <li><h2>2. Upload Photos Of Your Wardrobe</h2></li>
                  <li><h2>3. View Your Outfit Each Day</h2></li>
                  <li><Button onClick={() => setInfoPop("none")}>Close</Button></li>
                </ul>
              </div>
              
              <Navbar />
              

              <Switch>

                <Route path="/wardrobe">
                  <Wardrobe /> 
                </Route>

                <Route path="/location">
                  <Location />
                </Route>

                <Route path="/add">
                  <AddOutfit />
                </Route>

                <Route path="/">
                  <WeatherClothes />
                </Route>

                
              
              </Switch>

            </UserContext.Provider>
          </div>

        </Router>

      )
      }
    
    </div>
  
  );
}

export default App;
