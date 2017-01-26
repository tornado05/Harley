import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu.jsx';
import MyMap from './map.jsx';
import MyChart from './chart.jsx';
import Footer from './footer.jsx';

class Harley extends React.Component {
    render() {
        return (
            <div className="container">
                <Menu/>
                <MyMap/>
                <br/>
                <MyChart/>
                <br/>
                <Footer text='2017'/>
            </div>
        );
    }
}

ReactDOM.render(<Harley/>, document.getElementById('app'));