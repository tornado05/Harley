import React from "react";
import axios from "axios";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

L.Icon.Default.imagePath = "./img/leaflet/";
let state = {
    lat: 49.40099,
    lng: 28.33086,
    zoom: 7
};


export default class LeafletMap extends React.Component {
    constructor() {
        super();

        this.updatePoints = this.updatePoints.bind(this);

        this.state = {
            leafletConf: {},
            points: [{
                position: [state.lat, state.lng]
            }]
        };
    }

    componentWillMount() {
        axios.get("http://localhost:3000/weather/v01/configs")
            .then(res => {
                const leafletConf = res.data.leaflet;
                this.setState({ leafletConf });
                //console.log("leaflet conf");
                //console.log(this.state);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("http://localhost:3000/weather/v01/configs")
            .then(res => {
                this.updatePoints(res.data.cities);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updatePoints (data) {
        let points = [];
        data.forEach(point => {
            points.push({
                position: [
                    point.xCords,
                    point.yCords
                ]});
        });
        this.setState({
            points: points
        });
    }

    render () {
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
                    //console.log(point);
                    return (
                        <Marker
                            key={"point" + index}
                            position={point.position}
                        >
                            <Popup>
                                <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>
        )
    }
}