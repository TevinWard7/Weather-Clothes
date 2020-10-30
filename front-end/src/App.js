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
import LogIn from "./Pages/LogIn/login"
import Pusher from "pusher-js";

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    const pusher = new Pusher('287ac456408137934fc5', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('outfits');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  }, [])


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
