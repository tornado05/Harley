import harleyReducer from "./../reducers/harleyReducer.jsx";
import {createStore} from "redux";
import {CHART_TYPES} from "./../constants/constants.jsx";

let initialDate = new Date().toISOString();

let store = createStore(harleyReducer, {
    chart: {
        chartType: CHART_TYPES.TEMPERATURE,
        cityName: 'Rivne',
        periodFrom: initialDate,
        periodTo: initialDate,
        statType: CHART_TYPES.TEMPERATURE
    },
    weather: {
        weather: []
    },
    statistics: {
        statistics: []
    }
});

export default store;