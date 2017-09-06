import React from 'react';
import { FormattedMessage } from 'react-intl';
import HeaderAction from '../actions/HeaderActions';

class About extends React.Component {

    componentDidMount() {
        HeaderAction.eraseAction();
        HeaderAction.setTitle('about.header');
    }

    render() {
        return (
            <FormattedMessage
                id="about.content"
                values={{ email: <a href="mailto:feedback@salesfollow.com">feedback@salesfollow.com</a> }}
            />
        );
    }
}

export default About;
