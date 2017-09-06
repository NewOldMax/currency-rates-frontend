import React from 'react';
import PairForm from './PairForm';
import PairAction from '../../../actions/PairActions';

class PairAddForm extends React.Component {

    handleSubmit() {
        this.setState({
            pending: true,
        });
        const { pair } = this.state;
        PairAction.createPair(pair).then(() => {
            this.reset();
            PairAction.getPairs();
        });
    }

    render() {
        return (
            <PairForm handleSubmit={this.handleSubmit} type="create" />
        );
    }
}

export default PairAddForm;
