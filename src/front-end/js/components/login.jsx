import React from "react";
import { Modal, Button, FormControl } from "react-bootstrap";


import { changeUserEmailAction, changeUserPasswordAction, catchErrorAction } from "./../actions/authAction.jsx";
//import Auth from '../modules/auth';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleGetAuth = this.handleGetAuth.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.state = props;
        this.getInitialState();
    }

    getInitialState() {
        return { showModal: false };
    }

    handleModalClose() {
        this.setState({ showModal: false });
    }

    handleModalOpen() {
        this.setState({ showModal: true });
    }

    handleEmail(email) {
        changeUserEmailAction(email.target.value);
    }

    handlePassword(password) {
        changeUserPasswordAction(password.target.value);
    }

    handleGetAuth(value) {

    }

    render () {
        return (
            <div className="static-modal text-center">
                <Button
                    bsSize="large"
                    bsStyle="primary"
                    onClick={this.handleModalOpen}
                >
                    Log in
                </Button>
                <Modal
                    onHide={this.handleModalClose}
                    show={this.state.showModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            onChange={this.handleEmail}
                            placeholder="Enter email"
                            type="text"
                            value={this.props.userName}

                        />
                        <FormControl
                            onChange={this.handlePassword}
                            placeholder="Enter password"
                            type="password"
                            value={this.props.userPassword}

                        />
                        <Button onClick={this.handleGetAuth}>
                            Login
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleModalClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

Login.propTypes = {
    authError: React.PropTypes.object,
    userName: React.PropTypes.string,
    userPassword: React.PropTypes.string
};