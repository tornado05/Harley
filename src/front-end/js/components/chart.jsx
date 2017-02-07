import React from "react";
import {Bar} from "react-chartjs-2";
import {CHART_TYPES, CHART_PARAMS} from "./../constants/constants.jsx";

import {getWeatherData} from "../actions/dataActions.jsx";


import store from "../stores/harleyStore.jsx";

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this._getChartValue = this._getChartValue.bind(this);
        this._getServicesByCity = this._getServicesByCity.bind(this);
        this.state = store.getState();
        getWeatherData();
    }

    _getChartValue () {
        switch (this.state.chart.chartType) {
            case CHART_PARAMS.PREASURE.NAME:
                return CHART_PARAMS.PREASURE.LABEL;
            case CHART_PARAMS.HUMIDITY.NAME:
                return CHART_PARAMS.HUMIDITY.LABEL;
            case CHART_PARAMS.WIND_SPEED.NAME:
                return CHART_PARAMS.WIND_SPEED.LABEL;
            case CHART_PARAMS.TEMPERATURE.NAME:
                return CHART_PARAMS.TEMPERATURE.LABEL;
        }
    }

    _getServicesByCity (){
        //TODO: get city name from state
        let city = "Rivne";
        let services = [];
        let data = [];
        let label = this._getChartValue();

        this.state.weather.weather.forEach( (item) => {
            if (item.cityName === city){
                services.push(item.sourceAPI);
                data.push(item[label]);
            }
        });
        return {services, data};
    }

    render() {
        console.log("state", this.state);
        console.log("chartType", this.state.chart.chartType);
        let weather = this._getServicesByCity();
        console.log(weather);
        const data = {
            labels: weather.services,
            datasets: [
                {
                    label: this.state.chart.chartType,
                    backgroundColor: [
                        "rgba(255, 99,  132, 0.2)",
                        "rgba( 54, 162, 235, 0.2)",
                        "rgba(255, 206,  86, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99,  132, 1)",
                        "rgba( 54, 162, 235, 1)",
                        "rgba(255, 206,  86, 1)"

                    ],
                    borderWidth: 1,
                    data: weather.data
                }
            ]
        };
        const option = {
            responsive: true
        };

        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4">
                            <h2>Curren Weather Chart</h2>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                            <select name="city">
                                <option value="Rivne">Rivne</option>
                                <option value="Kiev">Kiev</option>
                                <option value="Lutsk">Luts'k</option>
                            </select>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                            <select name="params">
                                <option value="temp">Temperature</option>
                                <option value="pressure">Pressure</option>
                                <option value="humidity">Humidity</option>
                                <option value="windSpeed">Wind Speed</option>
                            </select>
                        </div>
                    </div>
                </div>
                <Bar
                    data={data}
                    options={option}
                />
            </section>
        );
    }
}
