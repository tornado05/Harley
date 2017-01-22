import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.jsx';
import Content from './components/content.jsx';
import Footer from './components/footer.jsx';

class World extends React.Component {
  render() {
    return (
    	<div className="row">
	    	<Header/>
            <Content/>
            <Footer/>
    	</div>
    );
  }
}
 
ReactDOM.render(<World/>, document.getElementById('app'));
