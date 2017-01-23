import React from 'react';
var LineChart = require("react-chartjs").Line;

export default class SideNav extends React.Component {
    constructor() {
        super();

    }
    render() {
        return <LineChart data={
        {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            }]
        }
        } options={
        {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            }
        }
        } width="600" height="250"/>
    }
}
