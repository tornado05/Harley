import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import {CHART_TYPES} from "./../constants/constants.jsx";

import L from "leaflet";
L.Icon.Default.imagePath = "./img/leaflet/";

export default class LeafletMap extends React.Component {
    constructor() {
        super();
        
        this.getParamByCity = this.getParamByCity.bind(this);
        
    }    

    getParamByCity(city, param){
        return _.map(_.filter(this.props.weather, weatherItem => {
            return weatherItem.cityName === city && weatherItem.sourceAPI === "openWeather";
        }), item => item[param]);
    }

    

    render () {
        console.log('Leaflet leaflet props === ',this.props);

        /*console.log('Leaflet ParseCities props === ',this.ParseCities());
        console.log('Leaflet ParseState props === ',this.ParseState());
        console.log('Leaflet ParseCitiesName props === ',this.ParseCitiesName());*/

        const position = [];
        const zoom = 0;

        return (            
            <Map
                center={position}
                zoom={zoom}
            >
                <TileLayer
                    attribution="Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='http://mapbox.com'>Mapbox</a>"
                    url="https://api.tiles.mapbox.com/v4/mapbox.emerald/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5keWtobWFyYSIsImEiOiJjaXVscXF5NTkwMDBiMm9waWlhamZldHB2In0.4ooYXIW33pagGNU4r9Hggw"
                />
                { this.props.map((point, index) => {
                    return (
                        <Marker
                            key={index}
                            position={point}
                        >
                            <Popup>
                                <div className="popup-statistic">
                                    <h4>{point}</h4>
                                    <ul>
                                        <li>{this.getParamByCity(point.name, CHART_TYPES.TEMPERATURE)}</li>
                                    </ul>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>
        );
    }
}
LeafletMap.propTypes = {
    weather: React.PropTypes.array,
    leaflet: React.PropTypes.array
};
