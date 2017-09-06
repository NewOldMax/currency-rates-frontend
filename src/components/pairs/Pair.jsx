import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { browserHistory } from 'react-router';
import EditIcon from 'react-icons/lib/md/edit';
import DeleteIcon from 'react-icons/lib/md/delete';
import ViewIcon from 'react-icons/lib/fa/eye';
import PairAction from '../../actions/PairActions';

const style = {
    value: {
        fontSize: '18px',
        color: '#212121',
    },
    icon: {
        cursor: 'pointer',
        marginRight: '8px',
    },
};

const fields = [
    { key: 'base_currency', label: 'Base currency' },
    { key: 'target_currency', label: 'Target currency' },
    { key: 'duration', label: 'Duration' },
    { key: 'value', label: 'Amount' },
];

const icons = [
    {
        icon: ViewIcon,
        props: {
            style: style.icon,
            onClick: id => browserHistory.push(`pairs/${id}`),
            title: 'View Pair',
        },
    },
    {
        icon: EditIcon,
        props: {
            style: style.icon,
            onClick: id => PairAction.showEditForm(id),
            title: 'Edit Pair',
        },
    },
    {
        icon: DeleteIcon,
        props: {
            style: style.icon,
            onClick: id => PairAction.deletePair(id).then(() => PairAction.getPairs()),
            title: 'Remove',
        },
    },
];

const renderFields = pair => fields.map(field => (
    <Col xs="2" key={field.label}>
        <div style={style.value}>
            {pair[field.key]}
        </div>
    </Col>
));

const renderActions = pair => (
    <Col xs="2">
        {icons.map((icon, i) => {
            const Icon = icon.icon;
            const { onClick, ...rest } = icon.props;
            return <Icon key={i} {...rest} onClick={() => onClick(pair.id)} />;
        })}
    </Col>
);

class Pair extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState || this.props !== nextProps;
    }

    render() {
        const { pair } = this.props;
        return (
            <Row>
                {renderFields(pair)}
                {renderActions(pair)}
            </Row>
        );
    }
}

Pair.propTypes = {
    pair: PropTypes.object.isRequired,
};

export default Pair;
