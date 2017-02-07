import React from "react";
import { Line } from "react-chartjs-2";
import {CHART_TYPES} from "./../constants/constants.jsx";
import _ from "lodash";


export default class StatChart extends React.Component{
    constructor(props) {
        super(props);
        this._getChartData = this._getChartData.bind(this);
        this._getTimeLabel = this._getTimeLabel.bind(this);
    }
    // TODO: TEMP FUNCTIONs
    _getChartData() {
        console.log('StatChart', this.props.statistics);
        let openWeatherData = [];
        _.each(this.props.statistics, function (data) {
           if (data.sourceAPI === "openWeather") openWeatherData.push(data.stat)
        });
        console.log(openWeatherData);
        return openWeatherData.map(stat=>stat.temp.avg);
    }
    _getTimeLabel() {
        let timeLabel = [];
        _.each(this.props.statistics, function (data) {
            if (data.sourceAPI === "openWeather") {
                let date = new Date(data.date * 1000);
                timeLabel.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
            }
        });
        return timeLabel;
    }
    render(){
        const data = {
            labels: this._getTimeLabel(),
            datasets: [
                {
                    label: "StatChart",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                    data: this._getChartData()
                }
            ]
        };
        const option = {
            responsive: true
        };

        return(
            <div>
                <Line
                    data={data}
                    options={option}
                />
            </div>
        );
    }
}

StatChart.propTypes = {
    statistics: React.PropTypes.array
};