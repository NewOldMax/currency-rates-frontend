import React from 'react';
import LoginAction from '../actions/LoginActions';

class Logout extends React.Component {

    componentDidMount() {
        LoginAction.logout();
    }

    render() {
        return null;
    }
}

export default Logout;
