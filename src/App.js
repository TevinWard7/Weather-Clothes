import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/nav"
import WeatherClothes from "./Pages/WeatherClothes/weatherclothes";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import AddOutfit from './Pages/AddOutfit/addoutfit';

function App() {
  return (

    <Router>
      <Navbar />
        <Switch>
          <Route path="/add">
            <AddOutfit />
          </Route>
          <Route path="/">
            <WeatherClothes />
          </Route>
        </Switch>
    </Router>
  
  );
}

export default App;
