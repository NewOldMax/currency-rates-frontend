import React from 'react';
import PropTypes from 'prop-types';
import LeftMenu from './LeftMenu';
import Header from './Header';

const App = props => (
    <div>
        <LeftMenu />
        <div id="main-container">
            <Header />
            <div id="main-content">
                {props.children}
            </div>
        </div>
    </div>
);

App.propTypes = {
    children: PropTypes.any,
};

export default App;
