import React from 'react';

export default class SideNav extends React.Component {
    constructor() {
        super();
    }
    render () {
        return (
            <div className={this.props.className}>
                <ul id="slide-out" className="">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <li>
                            <h3 className="">Menu</h3>
                        </li>
                        <li>
                            <label>Select city:</label>
                            <select className="city-select" name="cities">
                                <option value="Rivne">Rivne</option>
                                <option value="Kiev">Kiev</option>
                                <option value="Luts'k">Luts'k</option>
                            </select>
                        </li>
                        <li className="select-params"><p>
                            <input className="with-gap" name="parameter" type="radio" value="temp"
                                   id="Temperature"/>
                            <label htmlFor="Temperature">Temperature</label>
                        </p><p>
                            <input className="" name="parameter" type="radio" value="pressure"
                                   id="Pressure"/>
                            <label htmlFor="Pressure">Pressure</label>
                        </p><p>
                            <input className="" name="parameter" type="radio" value="humidity"
                                   id="Humidity"/>
                            <label htmlFor="Humidity">Humidity</label>
                        </p><p>
                            <input className="" name="parameter" type="radio" value="windSpeed"
                                   id="Wind speed"/>
                            <label htmlFor="Wind speed">Wind speed</label>
                        </p></li>
                        <li>
                            <h5 className="">Select period</h5>
                            <form className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <p className="">From</p>
                                <input type="date" name="date-from" className=""/>
                            </form>
                            <form className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <p className="">to</p>
                                <input type="date" name="date-to" className=""/>
                            </form>
                            <a className="btn" id="statistics">Show</a>
                        </li>
                    </div>
                </ul>
            </div>
        );
    }
}