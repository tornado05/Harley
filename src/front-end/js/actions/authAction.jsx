import axios from "axios";
import { ACTION_TYPES } from "./../constants/constants.jsx";
import store from "./../stores/harleyStore.jsx";

export function authorize (email, password) {
    console.log(email, password);

    axios.post(`http://localhost:3000/login?email=${email}&password=${password}`)
        .then(
            function (data) {
                console.log(data);
            }
        )
        .catch(function (error) {
            console.log(error);
            console.log(error.messages);
        });
}

export function changeUserEmailAction (userName){
    store.dispatch({
        type: ACTION_TYPES.SET_USER_EMAIL,
        userName: userName
    });
}

export function changeUserPasswordAction (password){
    store.dispatch({
        type: ACTION_TYPES.SET_USER_PASSWORD,
        userPassword: password
    });
}

export function catchErrorAction (error){
    store.dispatch({
        type: ACTION_TYPES.SET_AUTH_ERROR,
        authError: error
    });
}