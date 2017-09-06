import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Input, Label } from 'reactstrap';
import classNames from 'classnames';
import moment from 'moment';
import PairAction from '../../actions/PairActions';
import HeaderAction from '../../actions/HeaderActions';
import PairStore from '../../stores/PairStore';
import Chart from './Chart';

const fields = [
    { key: 'base_currency', label: 'Base currency' },
    { key: 'target_currency', label: 'Target currency' },
    { key: 'duration', label: 'Duration' },
    { key: 'value', label: 'Amount' },
];

const style = {
    label: {
        fontSize: '14px',
    },
    value: {
        fontSize: '20px',
        fontWeight: 500,
    },
};

const Round = value => Math.round(value * 10000) / 10000;

const getClass = (value) => {
    if (value > 0) {
        return 'text-success';
    }
    if (value < 0) {
        return 'text-danger';
    }
    return '';
};

const TableHeader = () => (
    <thead>
        <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Rate</th>
        </tr>
    </thead>
);

const groupRates = (rates, groupBy, amount) => {
    let items = rates;
    if (groupBy === 'week') {
        const grouped = {};
        rates.map((rate) => {
            const week = moment(rate.date).isoWeek();
            if (!grouped.hasOwnProperty(week)) {
                grouped[week] = {
                    value: 0,
                    week,
                    year: moment(rate.date).year(),
                    count: 0,
                };
            }
            grouped[week].value += rate.value;
            grouped[week].count++;
            return rate;
        });
        items = Object.keys(grouped).map(key => ({
            value: Round(grouped[key].value / grouped[key].count),
            date: `${grouped[key].year}, ${grouped[key].week} week`,
            sort_date: moment().year(grouped[key].year).week(grouped[key].week).toDate(),
        }));
        items.sort((a, b) => {
            if (a.sort_date < b.sort_date) {
                return 1;
            }
            if (a.sort_date > b.sort_date) {
                return -1;
            }
            return 0;
        });
    }
    if (items && items.length) {
        const todayRate = items[0];
        todayRate.amount = Round(todayRate.value * amount);
        return items.map((rate, i) => {
            rate.amount = Round(rate.value * amount);
            if (i === 0) {
                rate.value_profit = 0;
                rate.amount_profit = 0;
            } else {
                rate.value_profit = Round(rate.value - todayRate.value);
                rate.amount_profit = Round(rate.amount - todayRate.amount);
            }
            return rate;
        });
    }
    return items;
};

const TableBody = (props) => {
    const { rates } = props;
    let minIndex = -1;
    let maxIndex = -1;
    let minValue = Number.MAX_SAFE_INTEGER;
    let maxValue = -1;
    rates.map((rate, i) => {
        if (maxValue < rate.value) {
            maxValue = rate.value;
            maxIndex = i;
        }
        if (minValue > rate.value) {
            minValue = rate.value;
            minIndex = i;
        }
        return rate;
    });
    const content = rates.map((rate, i) => {
        const classes = classNames({
            'table-danger': i === minIndex,
            'table-success': i === maxIndex,
        });
        return (
            <tr key={i} className={classes}>
                <td>{rate.date}</td>
                <td>{rate.amount} <span className={getClass(rate.amount_profit)}>({rate.amount_profit})</span></td>
                <td>{rate.value} <span className={getClass(rate.value_profit)}>({rate.value_profit})</span></td>
            </tr>
        );
    });
    return (
        <tbody>
            {content}
        </tbody>
    );
};

TableBody.propTypes = {
    rates: PropTypes.array,
};

class PairPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pair: {},
            rates: [],
            groupBy: 'day',
        };

        this._onChange = this._onChange.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        HeaderAction.setTitle('Currency Pair');
        PairStore.addChangeListener(this._onChange);
        this.getData(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id && nextProps.params.id) {
            this.getData(nextProps.params.id);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState || this.props !== nextProps;
    }

    componentWillUnmount() {
        PairStore.removeChangeListener(this._onChange);
        PairAction.erasePair();
        PairAction.eraseRates();
    }

    getData(id) {
        PairAction.getPair(id);
        PairAction.getHistoricalInfo(id);
    }

    _onChange() {
        this.setState({
            pair: PairStore.getPair(),
            rates: PairStore.getRates(),
        });
    }

    handleSelect(event) {
        const groupBy = event.target.value;
        this.setState({
            groupBy,
        });
    }

    renderPair(pair) {
        return fields.map(field => (
            <Col xs="3" key={field.label}>
                <div style={style.label}>
                    {field.label}
                </div>
                <div style={style.value}>
                    {pair[field.key]}
                </div>
            </Col>
        ));
    }

    renderTable(pair, rates) {
        if (rates && rates.length) {
            return (
                <Table>
                    <TableHeader />
                    <TableBody rates={rates} />
                </Table>
            );
        }
        return null;
    }

    renderSelect(groupBy) {
        return (
            <Col xs="3">
                <Label>Group By:</Label>
                <Input type="select" value={groupBy} onChange={this.handleSelect}>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                </Input>
            </Col>
        );
    }

    render() {
        const { pair, rates, groupBy } = this.state;
        const groupedRates = groupRates(rates, groupBy, pair.value);
        return (
            <div>
                <Row>
                    {this.renderPair(pair)}
                </Row>
                <br />
                <Row>
                    {this.renderSelect(groupBy)}
                </Row>
                <Chart rates={groupedRates} />
                <br />
                {rates.length > 0 && this.renderTable(pair, groupedRates)}
            </div>
        );
    }
}

PairPage.propTypes = {
    params: PropTypes.object,
};

export default PairPage;
