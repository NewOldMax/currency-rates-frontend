import React from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'reactstrap';

class PageNotFound extends React.Component {

    render() {
        return (
            <div className="container">
                <h1>Page not found</h1>
                <h4>We are sorry but the page you are looking for does not exist.</h4>
                <Button onClick={() => browserHistory.push('/')}>Go to main page</Button>
            </div>
        );
    }
}

export default PageNotFound;
