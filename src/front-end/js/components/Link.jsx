import React from 'react'

const Link = (props) => {
	console.log("Link render",props);
	return (
		<a href="#" onClick={props.onClick}>Test Link clicked - {props.clicked} </a>
	)
}

export default Link