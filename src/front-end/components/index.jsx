import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu/menu.jsx';
import Map from './map/map.jsx';
import Footer from './footer/footer.jsx';

class Harley extends React.Component {
    render() {
        return (
            <div className="container">
                <Menu/>
                <Map/>
                <Footer text='2017'/>
            </div>
        );
    }
}

ReactDOM.render(<Harley/>, document.getElementById('app'));