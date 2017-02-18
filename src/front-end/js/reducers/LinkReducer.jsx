export default function LinkReducer (state = {}, action) {
	console.log('LinkReducer', state, action);
	switch(action.type) {
		case "link click":
			return {
				clicked: ++state.clicked
			}
		default:
			return state
	}
}
