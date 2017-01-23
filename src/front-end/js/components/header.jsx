import React from 'react';
import SideNav from './sideNav.jsx';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.collapseSideNav        = this.collapseSideNav.bind(this);
        this._getSideNavClassName   = this._getSideNavClassName.bind(this);
        this._getBurgerClassName    = this._getBurgerClassName.bind(this);
        this.state = {
            sideNavCollapsed: true
        };
    }

    collapseSideNav() {
        this.setState({
            sideNavCollapsed: !this.state.sideNavCollapsed
        });
    }
    _getSideNavClassName() {
        return this.state.sideNavCollapsed ? 'sideNav collapsed' : 'sideNav';
    }
    _getBurgerClassName() {
        return this.state.sideNavCollapsed ? 'burger' : 'burger active';
    }
    

    render() {
        return (
            <header>
                <div className="nav">
                    <a href="/" className="logo">Harley weather</a>
                    <a href="#" onClick={this.collapseSideNav} className={this._getBurgerClassName()}><span></span></a>
                </div>
                <div className={this._getSideNavClassName()}>

                </div>
                <SideNav className={this._getSideNavClassName()}/>
            </header>
        );
    }
}