import {ACTION_TYPES} from "./../constants/constants.jsx";

export function weather (state = {}, action) {
	switch (action.type) {
		case ACTION_TYPES.SET_WEATHER_DATA:
			console.log(action);
			let newState = state;
			newState.weather = action.weather;
			console.log("weather reducer", state, newState);
			return newState;
		default: return state
	}
}