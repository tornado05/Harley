import React from 'react';

export default class Menu extends React.Component {
	constructor() {
		super();
		this.clickHandler = this.clickHandler.bind(this);
		this._getClassName = this._getClassName.bind(this);

		this.state = {
			pressed: false
		};
	}

	clickHandler() {
		this.setState({ 
			pressed: !this.state.pressed
		});
	}

	_getClassName() {
		return this.state.pressed ? 'pressed-some-class' : 'some-class';
	}

	render () {
		return (
			<div onClick={this.clickHandler} className={this._getClassName()}> {this.props.text} </div>
		);
	}
}