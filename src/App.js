import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar/nav"
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
import { CircularProgress} from "@material-ui/core";

const App = () => {

  const [{ user }, dispatch] = useStateValue();
  const [fetching, setFetching] = useState()

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

  return (
    <>
      {!user ? (
        fetching ? (
          <div id="loader"><CircularProgress /></div>
        )
        : (
        <LogIn />
        )
      ) : (
        <Router>

          <Navbar />
          
          <Switch>

            <Route path="/wardrobe">
                <Wardrobe /> 
            </Route>

            <div className="default-bck">

              <Route path="/location">
                <Location />
              </Route>

              <Route path="/add">
                  <AddOutfit />
              </Route>

              <Route path="/">
                  <WeatherClothes />
              </Route>

            </div>
            

          </Switch>

        </Router>
      )}
    
    </>
  
  );
}

export default App;
