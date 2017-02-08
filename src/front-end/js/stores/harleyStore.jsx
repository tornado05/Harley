import harleyReducer from "./../reducers/harleyReducer.jsx";
import { createStore } from "redux";

let store = createStore(harleyReducer, {
      weather: {
        weather: []
      }
    });

export default store;