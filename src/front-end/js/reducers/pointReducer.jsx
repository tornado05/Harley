import {ACTION_TYPES} from './../constants/constants.jsx';

export function pointerReducer (state = {}, action) {
	// state = {
	// 	test: 'init state'
	// }
	switch (action.type) {
		case ACTION_TYPES.TEST:
			console.log(action);
			return {
				test: action.test
			}
		default: return state
	} 
}