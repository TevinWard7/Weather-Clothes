import React, { useEffect, useState, lazy, Suspense } from 'react';
import './App.css';
import Navbar from "./components/Navbar/nav";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { useStateValue } from "./utils/stateProvider";
import { auth } from "./utils/firebase";
import { actionTypes } from "./utils/reducer";
import { CircularProgress } from "@material-ui/core";
import { UserContext } from './utils/UserContext';
import { Button } from "@material-ui/core";

// Lazy load page components for code splitting
const WeatherClothes = lazy(() => import("./Pages/WeatherClothes/weatherclothes"));
const AddOutfit = lazy(() => import('./Pages/AddOutfit/addoutfit'));
const Wardrobe = lazy(() => import('./Pages/Wardrobe/wardrobe'));
const Location = lazy(() => import("./Pages/Location/location"));
const LogIn = lazy(() => import("./Pages/LogIn/login"));

// Routes component that uses location as key to force re-renders
const Routes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div id="loader"><CircularProgress /></div>}>
      <Switch key={location.pathname}>
        <Route path="/wardrobe" component={Wardrobe} />
        <Route path="/location" component={Location} />
        <Route path="/add" component={AddOutfit} />
        <Route exact path="/" component={WeatherClothes} />
      </Switch>
    </Suspense>
  );
};

const App = () => {

  const [{ user }, dispatch] = useStateValue();
  const [fetching, setFetching] = useState();
  const [bck, setBck] = useState();
  const [infoPop, setInfoPop] = useState("none");
  const [infoContent, setInfoContent] = useState();
  const [confirmDl, setConfirmDl] = useState();

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

  const popContent = (content) => {
    if (content === "how") {

      return(
        <>
          <li><h2>1. Enter Your Location</h2></li>
          <li><h2>2. Upload Photos Of Your Wardrobe</h2></li>
          <li><h2>3. View Your Outfit Each Day</h2></li>
        </>
      )

    }
    if (content === "img") return(<li><h2>Image Uploaded</h2></li>)
    if (content === "update") return(<li><h2>Updated</h2></li>)
    // if (content === "rmvFit") return(<li><h2>Are You Sure?</h2><Button onClick={setConfirmDl("yes")}>Yes</Button></li>)
  }

  return (
    <ErrorBoundary>
      <div className="app" style={{backgroundImage: bck, height:"100vh", width:"100vw", zIndex:"2"}}>
        {
        !user ? (
          fetching ? (
            <div id="loader"><CircularProgress /></div>
          ) : (
            <Suspense fallback={<div id="loader"><CircularProgress /></div>}>
              <LogIn />
            </Suspense>
          )
        ) : (

          <Router>

            <div>
              <UserContext.Provider value={{setBck, setInfoPop, setInfoContent, confirmDl, setConfirmDl}}>

              <div style={{display:infoPop, zIndex:999}} className="info-pop">
                <ul>
                  {popContent(infoContent)}
                  <li><Button onClick={() => setInfoPop("none")}>Close</Button></li>
                </ul>
                  <br/>
                  <br/>
              </div>

              <Navbar />

              <Routes />

            </UserContext.Provider>
          </div>

        </Router>

        )
        }

      </div>
    </ErrorBoundary>
  );
}

export default App;
