import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/menu.jsx';
 
class World extends React.Component {
  render() {
    return (
    	<div>
	    	<Menu text='first item'/>
	    	<Menu text='second item'/>
	    	<Menu text='third item'/>
	    	<Menu text='fourth item'/>
	    	<Menu text='fifth item'/>
    	</div>
    );
  }
}
 
ReactDOM.render(<World/>, document.getElementById('app'));
