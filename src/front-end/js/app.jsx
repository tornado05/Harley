import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.jsx';
import Content from './components/content.jsx';
import Footer from './components/footer.jsx';
import FetchDemo from './components/getData.jsx';

import {CHART_TYPES} from './constants/constants.jsx';

class Harley extends React.Component {
  constructor () {
    super();  

    this.changeChartType = this.changeChartType.bind(this);

    this.state = {
      chartType: CHART_TYPES.TEMPERATURE
    };
  }

  changeChartType (type) {
      this.setState({
        chartType: type
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
	        />
	        <FetchDemo/>
	        <Footer/>
    	</div>
    );
  }
}
 
ReactDOM.render(<Harley/>, document.getElementById('app'));
