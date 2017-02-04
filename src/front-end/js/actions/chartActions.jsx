import { ACTION_TYPES } from "./../constants/constants.jsx";
import store from './../stores/harleyStore.jsx';

export function changeChartType (chartType) {
	store.dispatch({
		type: ACTION_TYPES.CHANGE_CHART_TYPE,
		chartType: chartType
	});
}