import React from 'react';

export default class LoginForm extends React.Component {
    constructor() {
        super();
    };

    render () {
        return (
            <h1>Login form {this.props.text}</h1>
        );
    }
}