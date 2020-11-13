import React, { useEffect } from 'react';
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

function App() {

  const [{ user }, dispatch] = useStateValue();


  return (
    <>
      {!user ? (
        <LogIn />
      ) : (
        <Router>
      
        <Switch>
        <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/location">
          <Navbar />
            <Location />
          </Route>
          <Route path="/add">
            <Navbar />
            <AddOutfit />
          </Route>
          <Route path="/wardrobe">
            <Navbar />
            <Wardrobe />
          </Route>
          <Route path="/">
            <Navbar />
            <WeatherClothes />
          </Route>
        </Switch>
    </Router>
      )}
    
    </>
  
  );
}

export default App;
