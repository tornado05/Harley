import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu.jsx';
import MyMap from './map.jsx';
import Footer from './footer.jsx';

class Harley extends React.Component {
    render() {
        return (
            <div className="container">
                <Menu/>
                <div className="container">
                    <div className="row">
                        <div className="columns small-12 text-center">
                            <MyMap/>
                        </div>
                    </div>
                </div>
                <Footer text='2017'/>
            </div>
        );
    }
}

ReactDOM.render(<Harley/>, document.getElementById('app'));