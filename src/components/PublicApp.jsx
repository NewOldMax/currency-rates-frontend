import React from 'react';
import PropTypes from 'prop-types';

const PublicApp = props => (<div>{props.children}</div>);

PublicApp.propTypes = {
    children: PropTypes.any,
};

export default PublicApp;
