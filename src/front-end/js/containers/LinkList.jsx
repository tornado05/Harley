import React from 'react'
import { connect } from 'react-redux'
import Link from "./../components/Link.jsx"

const mapStateToProps = (state, ownProps) => {
	console.log("mapStateToProps",state, ownProps);
	return {
		clicked: state.clicked
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      /* store.dispatch */
      console.log("onClick");
      dispatch({type: "link click"})
    }
  }
}

const LinkList = connect(
		mapStateToProps,
		mapDispatchToProps
	)(Link)

export default LinkList