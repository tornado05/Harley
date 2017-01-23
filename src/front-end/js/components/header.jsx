import React from 'react';

export default class Header extends React.Component {
    constructor() {
        super();
    }

    _getUserName() {
        return this.props.user ? this.props.user : 'Guest';
    }

    render () {
        return (
            <header className="text-right">{'Hello, ' + this._getUserName()}</header>
        );
    }
}