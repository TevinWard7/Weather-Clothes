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
    <div className="app">
      {!user ? (
        <LogIn />
      ) : (
        <Router>

          <Navbar />
          
          <Switch>

            <Route path="/location">
               <Location />
            </Route>

            <Route path="/add">
                <AddOutfit />
            </Route>

            <Route path="/wardrobe">
                <Wardrobe />
            </Route>

            <Route path="/">
                <WeatherClothes />
            </Route>

          </Switch>

        </Router>
      )}
    
    </div>
  
  );
}

export default App;
