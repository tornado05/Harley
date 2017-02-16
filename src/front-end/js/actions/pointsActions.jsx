import {ACTION_TYPES} from "./../constants/constants.jsx";
import store from "./../stores/harleyStore.jsx";

export function testAction (testValue) {
	store.dispatch({
		type: ACTION_TYPES.TEST,
		test: testValue
	});
}