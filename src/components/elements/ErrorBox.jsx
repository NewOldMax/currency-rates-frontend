import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ErrorBox extends React.Component {

    static propTypes = {
        open: PropTypes.bool,
        onClose: PropTypes.func,
        message: PropTypes.node,
        duration: PropTypes.number,
    };

    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
        };

        this.timer = null;

        this.startTimeOut = this.startTimeOut.bind(this);
        this.forceClose = this.forceClose.bind(this);
        this.onClose = props.onClose;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.open });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    startTimeOut(duration) {
        this.timer = setTimeout(() => {
            this.setState({ open: false });
            this.onClose();
        }, duration);
    }

    forceClose() {
        clearTimeout(this.timer);
        this.onClose();
    }

    render() {
        // eslint-disable-next-line
        const { message, open, duration, onClose, ...rest } = this.props;

        if (duration && this.state.open) {
            this.startTimeOut(duration);
        }

        const classes = classNames('error-box', 'make-magic', {
            open: this.state.open,
        });

        return (
            <div className={classes} {...rest} onClick={this.forceClose}>
                {message}
            </div>
        );
    }
}
