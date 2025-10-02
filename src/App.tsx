// import { useState } from "react";
import "./App.css";
// import { getWeatherByCity } from "./services/weatherServices";
import { getWeather } from "./services/weatherServices";
import { getIpLocation } from "./utils/geolocation";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
const coords = await getIpLocation()
// const city = await getWeatherByCity("Lagos");
const weather = await getWeather(coords);

function App() {
  console.log(weather);

  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
    </>
  );
}

export default App;
