import {ACTION_TYPES} from "./../constants/constants.jsx";

export function chart (state = {}, action) {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_CHART_TYPE:
			let newState = state;
			newState.chartType = action.chartType;
			console.log("chart reducer", state, newState);
			return newState;
		case ACTION_TYPES.CHANGE_CITY_NAME:
			let cityState = state;
			cityState.cityName = action.cityName;
			console.log("chart reducer cityName", state, cityState);
			return cityState;
		case ACTION_TYPES.GET_DATE_FROM:
			let dateFromState = state;
			dateFromState.periodFrom = action.periodFrom;
			console.log("chart reducer dateFromState", state, dateFromState);
			return dateFromState;
		case ACTION_TYPES.GET_DATE_TO:
			let dateToState = state;
			dateToState.periodTo = action.periodTo;
			console.log("chart reducer periodTo", state, dateToState);
			return dateToState;
        case ACTION_TYPES.STAT_TYPE:
            let statTypeState = state;
            statTypeState.statType = action.statType;
            console.log("chart reducer statTypeState", state, statTypeState);
            return statTypeState;
		default: return state
	}
}