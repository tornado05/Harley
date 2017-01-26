import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.jsx';
import Content from './components/content.jsx';
import Footer from './components/footer.jsx';
import FetchDemo from './components/getData.jsx';

class Harley extends React.Component {
  render() {
    return (
    	<div className="row">
	    	<Header/>
            <Content/>
            <FetchDemo/>
            <Footer/>
    	</div>
    );
  }
}
 
ReactDOM.render(<Harley/>, document.getElementById('app'));
