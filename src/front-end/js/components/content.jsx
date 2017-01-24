import React from 'react';
import Chart from './chart.jsx';
import Leaflet from './leaflet.jsx';

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
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="map-wrapper">
                            <Leaflet/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

