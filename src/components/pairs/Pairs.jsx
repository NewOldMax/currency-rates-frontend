import React from 'react';
import { Row, Col } from 'reactstrap';
import HeaderAction from '../../actions/HeaderActions';
import PairAction from '../../actions/PairActions';
import PairStore from '../../stores/PairStore';
import PairAddForm from '../forms/pairs/PairAddForm';
import PairEditForm from '../forms/pairs/PairEditForm';
import Pair from './Pair';

export default class Pairs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pairs: [],
        };

        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        PairStore.addChangeListener(this._onChange);
        PairAction.getPairs();
        HeaderAction.setTitle('Currency Pairs');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState || this.props !== nextProps;
    }

    componentWillUnmount() {
        PairAction.erasePairs();
        PairStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            pairs: PairStore.getPairs(),
        });
    }

    renderHeader() {
        return (
            <Row>
                <Col xs="2">Base Currency</Col>
                <Col xs="2">Target Currency</Col>
                <Col xs="2">Duration</Col>
                <Col xs="2">Amount</Col>
                <Col xs="2">Actions</Col>
            </Row>
        );
    }

    render() {
        const { pairs } = this.state;
        return (
            <div>
                <PairAddForm />
                <PairEditForm />
                {pairs.length > 0 && this.renderHeader()}
                {pairs.map(pair => <Pair key={pair.id} pair={pair} />)}
            </div>
        );
    }
}
