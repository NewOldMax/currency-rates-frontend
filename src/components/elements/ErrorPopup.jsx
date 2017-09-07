import React from 'react';
import ErrorAction from '../../actions/ErrorActions';
import ErrorStore from '../../stores/ErrorStore';
import ErrorBox from './ErrorBox';

const style = {
    container: {
        position: 'fixed',
        top: '50px',
        left: '50%',
        width: '800px',
        marginLeft: '-400px',
        zIndex: 20,
    },
    error: {
        background: 'red',
        color: 'white',
    },
};

class ErrorPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            errors: [],
        };

        this.onClose = this.onClose.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        ErrorStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ErrorStore.removeChangeListener(this._onChange);
    }

    onClose() {
        this.setState({ open: false });
        ErrorAction.clearErrors();
    }

    _onChange() {
        this.setState({
            errors: ErrorStore.getErrors(),
        }, () => {
            if (this.state.errors.length) {
                this.setState({ open: true });
            }
        });
    }

    render() {
        const { open, errors } = this.state;
        const message = errors.length ? errors[0].detail : '';
        return (
            <div style={style.container}>
                <ErrorBox
                    open={open}
                    duration={4000}
                    onClose={this.onClose}
                    message={message}
                    style={style.error}
                />
            </div>
        );
    }
}

export default ErrorPopup;
