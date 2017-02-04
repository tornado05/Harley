import React         from 'react';
import ReactDOM      from 'react-dom';
import axios         from 'axios';

import Header        from './components/header.jsx';
import Content       from './components/content.jsx';
import Footer        from './components/footer.jsx';

import {CHART_TYPES} from './constants/constants.jsx';

class Harley extends React.Component {
  constructor () {
    super();  

    this.changeChartType = this.changeChartType.bind(this);

    this.state = {
      chartType: CHART_TYPES.TEMPERATURE,
      weather: []
    };
  }

  changeChartType (type) {
      this.setState({
        chartType: type
      });
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/weather/v01/current`)
      .then(res => {
        const weather = res.data;
        //console.log(weather);
        this.setState({
          weather: weather
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
    	<div className="row">
		      <Header
	          changeChartType={this.changeChartType}
	        />
	        <Content
	          chartType={this.state.chartType}
            weather={this.state.weather}
	        />	        
	        <Footer/>
    	</div>
    );
  }
}
 
ReactDOM.render(<Harley/>, document.getElementById('app'));
