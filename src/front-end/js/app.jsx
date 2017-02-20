import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header.jsx";
import Content from "./components/content.jsx";
import Footer from "./components/footer.jsx";
import { getWeatherData, getStatisticsDataAction, getLeafletData } from "./actions/dataActions.jsx";
import store from "./stores/harleyStore.jsx";

class Harley extends React.Component {

    constructor() {
        super();

        this.unsubscribe = store.subscribe(() => {
                this.setState(store.getState());
            }
        );
        this.state = store.getState();
        getWeatherData();
        getLeafletData();
        getStatisticsDataAction(this.state.chart.periodFrom, this.state.chart.periodTo, this.state.chart.cityName);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        console.log("Props from app.jsx === ", this.state);
        return (
            <div className="row">
                <Header
                    authError={this.state.authError}
                    chartState={this.state.chart}
                    userName={this.state.userName}
                    userPassword={this.state.userPassword}
                />
                <Content
                    chartType={this.state.chart.chartType}
                    currentChart={this.state.currentChart}
                    statistics={this.state.statistics.statistics}
                    weather={this.state.weather.weather}
                    leaflet={this.state.leaflet.leaflet}
                />
                <Footer/>
            </div>
        );
    }
}

ReactDOM.render(<Harley/>, document.getElementById("app"));

Harley.propTypes = {    
    leaflet: React.PropTypes.array
};