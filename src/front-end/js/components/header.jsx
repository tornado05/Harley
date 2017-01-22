import React from 'react';
//import SideNav from './sideNav.jsx';

export default class Header extends React.Component {
    constructor() {
        super();
        this.collapseSideNav = this.collapseSideNav.bind(this);
        this.showSideNav = this.showSideNav.bind(this);
        this._setSideNavClassName = this._setSideNavClassName.bind(this);
        this.state = {
            sideNavCollapsed: true
        };
    }

    collapseSideNav() {
        this.setState({
            sideNavCollapsed: !this.state.sideNavCollapsed
        });
    }

    showSideNav() {
        console.log('hi');
    }

    _setSideNavClassName() {
        return this.state.sideNavCollapsed ? 'sideNav collapsed' : 'sideNav';
    }

    render() {
        return (
            <header>
                <div className="nav">
                    <a href="#" className="logo">Harley weather</a>
                    <a href="#" onClick={this.collapseSideNav} className="burger">
                        <i className="material-icons">menu</i>
                    </a>
                </div>
                <div className={this._setSideNavClassName()}>
                    <div className="row">
                        <a href="#" onClick={this.showSideNav()} className="close-btn">
                            <i className="">close</i>
                        </a>
                    </div>
                    <ul id="slide-out" className="side-nav right-aligned">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <li>
                                <h3 className="center-align">Menu</h3>
                            </li>
                            <li>
                                <label>Select city:</label>
                                <select className="browser-default" name="cities">
                                    <option value="Rivne">Rivne</option>
                                    <option value="Kiev">Kiev</option>
                                    <option value="Luts'k">Luts'k</option>
                                </select>
                            </li>
                            <li className="params"><p>
                                <input className="with-gap" name="parameter" type="radio" value="temp"
                                       id="Temperature"/>
                                <label htmlFor="Temperature">Temperature</label>
                            </p><p>
                                <input className="with-gap" name="parameter" type="radio" value="pressure"
                                       id="Pressure"/>
                                <label htmlFor="Pressure">Pressure</label>
                            </p><p>
                                <input className="with-gap" name="parameter" type="radio" value="humidity"
                                       id="Humidity"/>
                                <label htmlFor="Humidity">Humidity</label>
                            </p><p>
                                <input className="with-gap" name="parameter" type="radio" value="windSpeed"
                                       id="Wind speed"/>
                                <label htmlFor="Wind speed">Wind speed</label>
                            </p></li>
                            <li>
                                <div className="row">
                                    <h5 className="title">SELECT PERIOD</h5>
                                    <form className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <p className="left-align">From</p>
                                        <input type="date" name="date-from" className="datepicker date-size"/>
                                    </form>
                                    <form className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <p className="left-align">to</p>
                                        <input type="date" name="date-to" className="datepicker date-size"/>
                                    </form>
                                </div>
                                <a className="btn" id="statistics">Show</a>
                            </li>
                        </div>
                    </ul>
                </div>
                {/*<SideNav/>*/}
            </header>
        );
    }
}