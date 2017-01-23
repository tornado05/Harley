import React from 'react';

export default class Footer extends React.Component {
    render () {
        return (
            <footer className="text-center">{this.props.text}</footer>
        );
    }
}