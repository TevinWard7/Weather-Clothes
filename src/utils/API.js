import Axios from "axios";

const APIKEY = "2f4e8dfb57bfb030fdf2188d7ed0b5e7";

export default {
    search: (city) => {
        return Axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=` + APIKEY)
    }
}