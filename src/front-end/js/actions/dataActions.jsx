import axios from "axios";
import { ACTION_TYPES } from "./../constants/constants.jsx";
import store from "./../stores/harleyStore.jsx";

export function getWeatherData () {
	axios.get("http://localhost:3000/weather/v01/current")
      .then(setWeatherData)
      .catch(function (error) {
        console.log("File: dataActions", error);
      });
}

export function setWeatherData (data) {
	console.log("Action:", ACTION_TYPES.SET_WEATHER_DATA);
	console.log(data);
	store.dispatch({
		type: ACTION_TYPES.SET_WEATHER_DATA,
		weather: data.data
	});
}

export function getStatisticsDataAction (from, to, cityName = "Rivne") {
	axios.get(`http://localhost:3000/weather/v01/stat/service-by-city/day?from=${castDate(from)}&to=${castDate(to)}&city=${cityName}`)
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

function castDate(date) {
	let rawDate = new Date(date);
	return `${rawDate.getFullYear()}-${rawDate.getMonth() + 1}-${rawDate.getDate()}`;
}