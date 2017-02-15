import React from "react";
import axios from "axios";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import {CHART_TYPES} from "./../constants/constants.jsx";

L.Icon.Default.imagePath = "./img/leaflet/";
let state = {
    lat: 50.75,
    lng: 27.37,
    zoom: 7
};


export default class LeafletMap extends React.Component {
    constructor(props) {
        super(props);
        
        this.getParamByCity = this.getParamByCity.bind(this);
        this.getCities = this.getCities.bind(this);
    }

    getParamByCity(city, param){
        return _.map(_.filter(this.props.weather, weatherItem => {
            return weatherItem.cityName === city && weatherItem.sourceAPI === "openWeather";
        }), item => item[param]);
    }

    getCities(){
        //console.log('this.props.leaflet === ',this.props);
        //return this.props.leaflet.cities.map(citi=>citi.name);
    }

    render () {
        console.log('leaflet.jsx props === ', this.props.weather);
        const position = [state.lat, state.lng];
        return (
            <Map
                center={position}
                zoom={state.zoom}
            >
                <TileLayer
                    attribution="Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='http://mapbox.com'>Mapbox</a>"
                    url="https://api.tiles.mapbox.com/v4/mapbox.emerald/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5keWtobWFyYSIsImEiOiJjaXVscXF5NTkwMDBiMm9waWlhamZldHB2In0.4ooYXIW33pagGNU4r9Hggw"
                />
                { this.state.points.map((point, index) => {
                    return (
                        <Marker
                            key={index}
                            position={point.position}
                        >
                            <Popup>
                                <div className="popup-statistic">
                                    <h4>{point.name}</h4>
                                    <ul>
                                        <li>{this.getParamByCity(point.name, CHART_TYPES.TEMPERATURE)}</li>
                                    </ul>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>
        )
    }
}
LeafletMap.propTypes = {
    weather: React.PropTypes.array,
    leaflet: React.PropTypes.array
};
