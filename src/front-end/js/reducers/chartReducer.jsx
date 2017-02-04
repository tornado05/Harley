import {ACTION_TYPES} from './../constants/constants.jsx';

export function chart (state = {}, action) {
	// state = {
	// 	test: 'init state'
	// }
	switch (action.type) {
		case ACTION_TYPES.CHANGE_CHART_TYPE:
			console.log(action);
			let newState = state;
			newState.chartType = action.chartType;
			console.log('chart reducer', state, newState);
			return newState;
		default: return state
	} 
}