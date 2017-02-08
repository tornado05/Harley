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

export function getStatisticsData (from, to, cityName) {
	console.log(from, to, cityName);
	axios.get("http://localhost:3000/weather/v01/stat/service-by-city/day?from=2017-01-01&to=2017-01-20&city=Rivne")
		.then(setStatisticsData)
		.catch(function (error) {
			console.log(error);
		});
}

export function setStatisticsData (data) {
	store.dispatch({
		type: ACTION_TYPES.GET_STATISTICS_DATA,
		statistics: data.data
	});
}