import React from 'react';
import { Link } from 'react-router';
import HeaderAction from '../../actions/HeaderActions';

export default class Home extends React.Component {

    componentWillMount() {
        HeaderAction.setTitle('Home');
    }

    render() {
        return <div>Welcome! To start using this service go to <Link to="/pairs">Currency Pairs Page</Link></div>;
    }
}
