import harleyReducer from "./../reducers/harleyReducer.jsx";
import {createStore} from "redux";
import {CHART_TYPES} from "./../constants/constants.jsx";

let store = createStore(harleyReducer, {
    chart: {
        chartType: CHART_TYPES.TEMPERATURE,
        cityName: 'Rivne',
        periodFrom: '2017-01-01',
        periodTo: '2017-01-01',
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