import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';

L.Icon.Default.imagePath = './img/leaflet/';

export default class MyMap extends React.Component {
    constructor() {
        super();
        this.state = {
            lat: 50.9,
            lng: 27.8,
            zoom: 7,
            token: 'pk.eyJ1IjoiZHJvYmVueXVrIiwiYSI6ImNpdXp3aDczZTAwM2wyb3IzbXF0OTZ5YjgifQ.2WbUs9CJ8XuPlG3coCxBbg',
            tiles: 'mapbox.streets'
        };
    }

    getURL() {
        return `https://api.tiles.mapbox.com/v4/${this.state.tiles}/{z}/{x}/{y}.png?access_token=${this.state.token}`
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const rivne = [50.630694, 26.239034];
        const kiev = [50.4308286, 30.4966362];
        const lutsk = [50.73977, 25.2639655];
        return (
            <div className="container">
                <div className="row">
                    <div className="columns small-12 text-center">
                        <Map center={position} zoom={this.state.zoom}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url={this.getURL()}
                            />
                            <Marker position={rivne}>
                                <Popup>
                                    <div className="popup-average">
                                        <header>
                                            City: <b>Rivne</b>
                                        </header>
                                        <div className="content">
                                            <p>Temperature: <b>-8</b></p>
                                            <p>Pressure: <b>788</b></p>
                                            <p>Humidity: <b>98</b></p>
                                            <p>Fall out: <b>none</b></p>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                            <Marker position={kiev}>
                                <Popup>
                                    <div className="popup-average">
                                        <header>
                                            City: <b>Kiev</b>
                                        </header>
                                        <div className="content">
                                            <p>Temperature: <b>-12</b></p>
                                            <p>Pressure: <b>798</b></p>
                                            <p>Humidity: <b>95</b></p>
                                            <p>Fall out: <b>snow</b></p>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                            <Marker position={lutsk}>
                                <Popup>
                                    <div className="popup-average">
                                        <header>
                                            City: <b>Luts`k</b>
                                        </header>
                                        <div className="content">
                                            <p>Temperature: <b>-9</b></p>
                                            <p>Pressure: <b>795</b></p>
                                            <p>Humidity: <b>92</b></p>
                                            <p>Fall out: <b>snow</b></p>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        </Map>
                    </div>
                </div>
            </div>
        );
    }
}