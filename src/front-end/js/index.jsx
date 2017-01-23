import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.jsx';
import Map from './components/map.jsx';
import Footer from './components/footer.jsx';

class Harley extends React.Component {
    render() {
        return (
            <div className="container">
                <Header user='John Doe'/>
                <Map/>
                <Footer text='2017'/>
            </div>
        );
    }
}

ReactDOM.render(<Harley/>, document.getElementById('app'));