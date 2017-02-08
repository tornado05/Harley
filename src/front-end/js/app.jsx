import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/header.jsx";
import Content from "./components/content.jsx";
import Footer from "./components/footer.jsx";

import { getWeatherData, getStatisticsData } from "./actions/dataActions.jsx";
import store from "./stores/harleyStore.jsx";

console.log(store);
class Harley extends React.Component {

    constructor() {
        super();

        this.unsubscribe = store.subscribe(() => {
                this.setState(store.getState());
            }
        );

        this.state = store.getState();
        console.log('IMPORTANT', this.state);
        getWeatherData();
        getStatisticsData();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        console.log("app.jsx", this.state);
        return (
            <div className="row">
                <Header/>
                <Content
                    chartType={this.state.chart.chartType}
                    weather={this.state.weather.weather}
                    statistics={this.state.statistics.statistics}
                />
                <Footer/>
            </div>
        );
    }
}

ReactDOM.render(<Harley/>, document.getElementById("app"));

