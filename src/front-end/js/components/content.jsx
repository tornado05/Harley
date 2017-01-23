import React from 'react';
import Chart from './chart.jsx';

var LineChart = require("react-chartjs").Line;

var MyComponent = React.createClass({
    render: function() {
        return <LineChart data={[
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]} options={{responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            }}}/>
    }
});

export default class Content extends React.Component {
    constructor() {
        super();
    }
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Chart/>
                        {/*<div className={MyComponent}></div>*/}
                    </div>
                </div>
            </div>
        );
    }
}

