import {combineReducers} from "redux";
import {pointerReducer} from "./pointReducer.jsx";
import {chart} from "./chartReducer.jsx";
import {weather} from "./weatherDataReducer.jsx";
import {statistics} from "./statisticsDataReducer.jsx";
import {currentChart} from "./currentChartReducer.jsx";

let harleyReducer = combineReducers({
    pointerReducer,
    chart,
    weather,
    statistics,
    currentChart
});

export default harleyReducer;