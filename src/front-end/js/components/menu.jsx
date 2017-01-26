import React from 'react';
import {Button, Colors, InputTypes, Switch, Sizes} from 'react-foundation';



export default class Menu extends React.Component {
    constructor() {
        super();
        this._toggleMenu = this._toggleMenu.bind(this);
        this._getMenuClassNames = this._getMenuClassNames.bind(this);
        this.state = {
            menuOpened: false
        };
    }

    _getMenuClassNames(){
        return this.state.menuOpened ? ' opened ' : '';
    }
    _toggleMenu(){
        this.setState({
            menuOpened: !this.state.menuOpened
        });
    }

    render(){
        return(
            <header id="header" className="row fluid">
                <div className="columns small-6 medium-4">
                    <h1>Harley</h1>
                </div>
                <div className="columns small-6 medium-8">
                    <button className={'button burger' + this._getMenuClassNames()} onClick={this._toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <aside className={this._getMenuClassNames()} >
                        <span className="close" onClick={this._toggleMenu}>&times;</span>
                        <h2 className="text-center" >Menu</h2>
                        <ul>
                            <li>
                                <label>Select city:</label>
                                <select name="cities">
                                    <option value="Rivne">Rivne</option>
                                    <option value="Kiev">Kiev</option>
                                    <option value="Luts'k">Luts'k</option>
                                </select>
                            </li>
                            <li>
                                <h5 className="text-center">Select parameter:</h5>
                                <div className="switch-inner-label-example">
                                    <p>Temperature:</p>
                                    <Switch input={{ type: InputTypes.RADIO, name: 'parameter', value:'temp' }}/>
                                </div>
                                <div className="switch-inner-label-example">
                                    <p>Pressure:</p>
                                    <Switch input={{ type: InputTypes.RADIO, name: 'parameter', value:'pressure' }}/>
                                </div>
                                <div className="switch-inner-label-example">
                                    <p>Humidity:</p>
                                    <Switch input={{ type: InputTypes.RADIO, name: 'parameter', value:'humidity' }}/>
                                </div>
                                <div className="switch-inner-label-example">
                                    <p>Wind speed</p>
                                    <Switch input={{ type: InputTypes.RADIO, name: 'parameter', value:'windSpeed' }}/>
                                </div>
                            </li>
                            <li>
                                <h5 className="text-center">Select period:</h5>
                                <p className="text-left">From</p>
                                <input type="date" name="date-from"/>
                                <p className="text-leftn">to</p>
                                <input type="date" name="date-to"/>
                                <Button color={Colors.PRIMARY}>Save</Button>
                            </li>
                        </ul>
                    </aside>
                </div>
            </header>
            );

    }
}