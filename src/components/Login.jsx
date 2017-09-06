import React from 'react';
import { Button } from 'reactstrap';
import config from '../config';

const style = {
    button: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '200px',
        height: '38px',
        marginTop: '-19px',
        marginLeft: '-100px',
    },
};

const handleLogIn = (event) => {
    event.preventDefault();
    const params = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes';
    window.win = window.open(
        `${config.config.schema}://${config.config.host}:${config.config.port}/api/connect/google`,
        'google',
        params);
};

const Login = () => (
    <Button
        color="success"
        style={style.button}
        onClick={handleLogIn}
        size="100%"
    >
        Log In with Google+
    </Button>
);

export default Login;
