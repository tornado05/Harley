import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

L.Icon.Default.imagePath = './img/leaflet/';
let state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
};


export default class LeafletMap extends React.Component {
    constructor() {
        super();
    }
    render () {
        const position = [state.lat, state.lng];
        return (
            <Map center={position} zoom={state.zoom}>
                <TileLayer
                    attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                    url='https://api.tiles.mapbox.com/v4/mapbox.emerald/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5keWtobWFyYSIsImEiOiJjaXVscXF5NTkwMDBiMm9waWlhamZldHB2In0.4ooYXIW33pagGNU4r9Hggw'
                />
                <Marker position={position}>
                    <Popup>
                        <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                    </Popup>
                </Marker>
            </Map>
        )
    }
}