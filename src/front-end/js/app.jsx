import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import LinkList from "./containers/LinkList.jsx";
import LinkReducer from "./reducers/LinkReducer.jsx"

let store = createStore(LinkReducer, {clicked: 0})

class World extends React.Component {
  render() {
    return (      	
          <div>
            <LinkList />
          </div>
    )
  }
}
/* Specially for Gagarin */
/*a => a.test*/
/*a => { return a.test; }*/
/*(a) => { return a.test; }*/
/*(a) => { return (<div>{a.test}</div>) }*/
 
ReactDOM.render(
  <Provider store={store}>
    <World/>
  </Provider>, 
  document.getElementById('app')
);
