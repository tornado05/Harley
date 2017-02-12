import { ACTION_TYPES } from "./../constants/constants.jsx";
import store from "./../stores/harleyStore.jsx";

export function changeChartType (chartType) {
	store.dispatch({
		type: ACTION_TYPES.CHANGE_CHART_TYPE,
		chartType: chartType
	});
}

export function changeCity (cityName) {
	store.dispatch({
		type: ACTION_TYPES.CHANGE_CITY_NAME,
		cityName: cityName
	});
}

export function changeDateFrom (periodFrom) {
	store.dispatch({
		type: ACTION_TYPES.GET_DATE_FROM,
		periodFrom: periodFrom
	});
}

export function changeDateTo (periodTo) {
	store.dispatch({
		type: ACTION_TYPES.GET_DATE_TO,
		periodTo: periodTo
	});
}

export function changeStatType (statType) {
    store.dispatch({
        type: ACTION_TYPES.STAT_TYPE,
        statType: statType
    });
}