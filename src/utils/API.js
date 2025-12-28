import Axios from "axios";

const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

const API = {
    search: (city) => {
        return Axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    }
};

export default API;