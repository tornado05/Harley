import {ACTION_TYPES} from "./../constants/constants.jsx";
import store from "./../stores/harleyStore.jsx";
import axios from "axios";

export function testAction (testValue) {
	store.dispatch({
		type: ACTION_TYPES.TEST,
		test: testValue
	});
}
export function getPoints () {
	axios.get("http://localhost:3000/weather/v01/configs")
		.then(setPoints)
		.catch(function (error) {
			console.log(error);
		});
}
export function setPoints (data) {
	store.dispatch({
		type: ACTION_TYPES.GET_POINTS,
		leaflet: data.data
	});
}