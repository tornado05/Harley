import {ACTION_TYPES} from "./../constants/constants.jsx";

export function pointsReducer (state = {}, action) {
    console.log("action - ", action);
    switch (action.type) {
        case ACTION_TYPES.GET_POINTS:
            let newState = state;
            newState.leaflet = action.leaflet;
            return newState;
        default: return state
    }
}