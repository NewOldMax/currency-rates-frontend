import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { currencies, durations } from '../../../constants';
import PairAction from '../../../actions/PairActions';
import FormField from '../FormField';

const style = {
    button: {
        marginTop: '30px',
    },
    form: {
        height: '120px',
    },
};

class PairForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = props.handleSubmit.bind(this);

        this.getFields = this.getFields.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentWillMount() {
        this.reset(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pair) {
            this.setState({ pair: nextProps.pair });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState || this.props !== nextProps;
    }

    getFields() {
        const { pair, pending } = this.state;
        const { type } = this.props;
        return [
            {
                name: 'base_currency',
                value: pair.base_currency,
                type: 'select',
                label: 'Base currency',
                onChange: this.handleInputChange,
                options: [
                    { value: '', label: 'Select base currency', props: { disabled: true } },
                    ...currencies,
                ],
                validators: ['required'],
                errorMessages: ['required field'],
                containerElement: <Col xs="2" />,
                disabled: pending,
            },
            {
                name: 'target_currency',
                value: pair.target_currency,
                type: 'select',
                label: 'Target currency',
                onChange: this.handleInputChange,
                options: [
                    { value: '', label: 'Select target currency', props: { disabled: true } },
                    ...currencies,
                ],
                validators: ['required'],
                errorMessages: ['required field'],
                containerElement: <Col xs="2" />,
                disabled: pending,
            },
            {
                name: 'duration',
                value: pair.duration,
                type: 'select',
                label: 'Target currency',
                onChange: this.handleInputChange,
                options: [
                    { value: '', label: 'Select duration', props: { disabled: true } },
                    ...durations,
                ],
                validators: ['required'],
                errorMessages: ['required field'],
                containerElement: <Col xs="2" />,
                disabled: pending,
            },
            {
                name: 'value',
                value: pair.value,
                type: 'text',
                label: 'Amount',
                onChange: this.handleInputChange,
                validators: ['required', 'isNumber', 'isPositive'],
                errorMessages: ['required field', 'should be an integer', 'should be positive'],
                containerElement: <Col xs="2" />,
                disabled: pending,
            },
            {
                name: 'submit',
                type: 'button',
                text: type === 'create' ? 'Create Pair' : 'Update Pair',
                props: {
                    type: 'submit',
                    color: 'primary',
                    style: style.button,
                    disabled: pending,
                },
                containerElement: <Col xs="2" />,
            },
        ];
    }

    reset(props) {
        let pair = {
            base_currency: '',
            target_currency: '',
            duration: '',
            value: 1,
        };
        if (props && props.pair) {
            pair = props.pair;
        }
        this.setState({
            pair,
            pending: false,
            open: false,
        });
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
        if (!this.props.noReset) {
            PairAction.erasePair();
        }
        PairAction.closeEditForm();
    }

    handleInputChange(event) {
        const { pair } = this.state;
        pair[event.target.name] = event.target.value;
        this.setState({ pair });
    }

    render() {
        // eslint-disable-next-line
        const { handleSubmit, modal, type, pair, noReset, ...rest } = this.props;
        const fields = this.getFields().map(field => <FormField key={field.name} field={field} />);
        let content = (
            <ValidatorForm
                onSubmit={this.handleSubmit}
                style={style.form}
                {...rest}
            >
                <Row>
                    {fields}
                </Row>
            </ValidatorForm>
        );
        if (modal) {
            content = (
                <Modal isOpen={this.state.open} toggle={this.handleClose}>
                    <ModalHeader>
                        {type === 'create' ? 'Create Currency Pair' : 'Update Currency Pair'}
                    </ModalHeader>
                    <ModalBody>
                        {content}
                    </ModalBody>
                </Modal>
            );
        }
        return content;
    }
}

PairForm.propTypes = {
    handleSubmit: PropTypes.func,
    type: PropTypes.oneOf(['create', 'update']).isRequired,
    modal: PropTypes.bool,
    pair: PropTypes.object,
    noReset: PropTypes.bool,
};

PairForm.defaultProps = {
    handleSubmit: () => {},
};

export default PairForm;
