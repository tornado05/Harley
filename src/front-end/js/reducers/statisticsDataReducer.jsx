import {ACTION_TYPES} from "./../constants/constants.jsx";

export function statistics (state = {}, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_STATISTICS_DATA:
            console.log(action);
            let newState = state;
            newState.statistics = action.statistics;
            console.log("statistics reducer", state, newState);
            return newState;
        default: return state
    }
}