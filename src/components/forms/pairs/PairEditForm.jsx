import React from 'react';
import PropTypes from 'prop-types';
import PairForm from './PairForm';
import PairAction from '../../../actions/PairActions';
import PairStore from '../../../stores/PairStore';

class PairEditForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pair: {},
        };

        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        PairStore.addChangeListener(this._onChange);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState || this.props !== nextProps;
    }

    componentWillUnmount() {
        PairStore.removeChangeListener(this._onChange);
    }

    handleSubmit() {
        this.setState({
            pending: true,
        });
        const { pair } = this.state;
        PairAction.updatePair(pair.id, pair).then(() => {
            this.reset();
            if (!this.props.noReset) {
                PairAction.erasePair();
                PairAction.closeEditForm();
                PairAction.getPairs();
            } else {
                PairAction.closeEditForm();
                PairAction.getPair(pair.id);
                PairAction.getHistoricalInfo(pair.id);
            }
        });
    }

    _onChange() {
        this.setState({
            pair: PairStore.getPair(),
            open: PairStore.isEditForm(),
        }, () => {
            if (Object.keys(this.state.pair).length && this.state.open) {
                this.refs.form.handleOpen();
            }
        });
    }

    render() {
        const { pair } = this.state;
        return (
            <PairForm pair={pair} handleSubmit={this.handleSubmit} type="update" modal ref="form" noReset={this.props.noReset} />
        );
    }
}

PairEditForm.propTypes = {
    noReset: PropTypes.bool,
};

export default PairEditForm;
