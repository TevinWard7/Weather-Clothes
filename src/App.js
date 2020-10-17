import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/nav"
import Calender from "./components/Calender/calender";
import WeatherClothes from "../src/components/WeatherClothes/weatherclothes";

function App() {
  return (
    <>
      <Navbar/>
      <Calender/>
      <WeatherClothes/>
    </>
  );
}

export default App;
