import Axios from "axios";

const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

const API = {
    search: (city) => {
        // Check if API key is configured
        if (!apiKey || apiKey === 'your_openweathermap_api_key_here') {
            return Promise.reject(new Error('OpenWeatherMap API key is not configured. Please add REACT_APP_OPENWEATHER_API_KEY to your .env file.'));
        }

        return Axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    }
};

export default API;