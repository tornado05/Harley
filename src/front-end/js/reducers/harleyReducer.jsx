import { combineReducers } from "redux";

import { leaflet } from "./leafletReducer.jsx";
import { chart } from "./chartReducer.jsx";
import { weather } from "./weatherDataReducer.jsx";
import { statistics } from "./statisticsDataReducer.jsx";

let harleyReducer = combineReducers({
  chart,
  weather,
  statistics,
  leaflet
});

export default harleyReducer;