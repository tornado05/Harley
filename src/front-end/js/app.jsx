import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/header.jsx";
import Content from "./components/content.jsx";
import Footer from "./components/footer.jsx";


import store from "./stores/harleyStore.jsx";

class Harley extends React.Component {

    constructor() {
        super();

        this.unsubscribe = store.subscribe(() => {
                this.setState(store.getState());
            }
        );

        this.state = store.getState();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className="row">
                <Header/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}

ReactDOM.render(<Harley/>, document.getElementById("app"));

