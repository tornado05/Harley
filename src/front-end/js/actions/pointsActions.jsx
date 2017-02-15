import axios from "axios";
import {ACTION_TYPES} from "./../constants/constants.jsx";
import store from "./../stores/harleyStore.jsx";

export function getLeafletPointsData () {
	axios.get("http://localhost:3000/weather/v01/configs")
		.then(setLeafletPointsData)
		.catch(function (error) {
			console.log(error);
		});
}

export function setLeafletPointsData (data) {
	store.dispatch({
		type: ACTION_TYPES.GET_LEAFLET_DATA,
		leaflet: data.data
	});
}
