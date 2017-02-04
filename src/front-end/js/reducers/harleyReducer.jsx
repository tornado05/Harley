import { combineReducers } from "redux";
import { pointerReducer } from "./pointReducer.jsx";
import { chart } from "./chartReducer.jsx";
import { weather } from "./weatherDataReducer.jsx";

let harleyReducer = combineReducers({
  pointerReducer,
  chart,
  weather
});

export default harleyReducer;