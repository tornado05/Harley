import {ACTION_TYPES} from "./../constants/constants.jsx";

export function pointerReducer (state = {}, action) {
	switch (action.type) {
		case ACTION_TYPES.TEST:
			return {
				test: action.test
			};
		default: return state
	}
}