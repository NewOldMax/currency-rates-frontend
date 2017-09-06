import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormFeedback, FormGroup } from 'reactstrap';
import { ValidatorComponent } from 'react-material-ui-form-validator';

const renderOptions = options => options.map(option => (
    <option key={option.value} value={option.value} {...option.props}>
        {option.label}
    </option>
));

class SelectValidator extends ValidatorComponent {
    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, validatorListener, options, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <FormGroup color={isValid ? 'none' : 'danger'}>
                <Input
                    {...rest}
                    type="select"
                    state={isValid ? 'none' : 'danger'}
                >
                    {renderOptions(options)}
                </Input>
                { !isValid && <FormFeedback>{this.getErrorMessage()}</FormFeedback> }
            </FormGroup>
        );
    }
}

SelectValidator.propTypes = {
    options: PropTypes.array,
};

export default SelectValidator;
