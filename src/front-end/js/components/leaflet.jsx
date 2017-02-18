import React from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import {CHART_TYPES} from "./../constants/constants.jsx";

L.Icon.Default.imagePath = "./img/leaflet/";

export default class Leaflet extends React.Component {
    constructor() {
        super();        
        this.getParamByCity = this.getParamByCity.bind(this);
        this.getParamByLeaflet = this.getParamByLeaflet.bind(this); 
        this.getParamByState = this.getParamByState.bind(this);       
    }

    getParamByCity(city, param){
        return _.map(_.filter(this.props.weather, weatherItem => {
            return weatherItem.cityName === city && weatherItem.sourceAPI === "openWeather";
        }), item => item[param]);
    }

    getParamByLeaflet(){
        var Citie = [];
        _.map(this.props.leaflet.cities, citie => {
            Citie.push(citie);
        });
        return Citie;
    }

    getParamByState(){        
        return _.map(this.props.leaflet.leaflet, (value,key) => {
            if(key === 'state'){
                return value;
            }
        });       
    }

    render () {
        console.log("Leaflet leaflet props === ",this.props);
        console.log("getParamByLeaflet === ",this.getParamByLeaflet());
        console.log("getParamByState === ",this.getParamByState());
        //const position = [this.getParamByState().lat,this.getParamByState().lan];
        //const zoom = this.getParamByState().zoom;
        const position = [50,27];
        const zoom = 7;

        return (            
            <Map
                center={position}
                zoom={zoom}
            >
                <TileLayer
                    attribution="Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='http://mapbox.com'>Mapbox</a>"
                    url="https://api.tiles.mapbox.com/v4/mapbox.emerald/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5keWtobWFyYSIsImEiOiJjaXVscXF5NTkwMDBiMm9waWlhamZldHB2In0.4ooYXIW33pagGNU4r9Hggw"
                />
                { this.getParamByLeaflet().map((point, index) => {
                    return (
                        <Marker
                            key={index}
                            position={[point.xCords,point.yCords]}
                        >
                            <Popup>
                                <div className="popup-statistic">
                                    <h4>{point.name}</h4>
                                    <ul>
                                        <li>Temperature: {this.getParamByCity(point.name, CHART_TYPES.TEMPERATURE)}</li>
                                        <li>Pressure: {this.getParamByCity(point.name, CHART_TYPES.PRESSURE)}</li>
                                        <li>Wind speed: {this.getParamByCity(point.name, CHART_TYPES.WIND_SPEED)}</li>
                                        <li>Humidity: {this.getParamByCity(point.name, CHART_TYPES.HUMIDITY)}</li>
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
Leaflet.propTypes = {
    weather: React.PropTypes.array,
    leaflet: React.PropTypes.array
};