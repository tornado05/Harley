import axios from "axios";
import { ACTION_TYPES } from "./../constants/constants.jsx";
import store from "./../stores/harleyStore.jsx";

export function getWeatherData () {
	axios.get("http://localhost:3000/weather/v01/current")
      .then(setWeatherData)
      .catch(function (error) {
        console.log(error);
      });
}

export function setWeatherData (data) {
	store.dispatch({
		type: ACTION_TYPES.SET_WEATHER_DATA,
		weather: data.data
	});
}