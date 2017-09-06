import React from 'react';
import { Input, FormFeedback, FormGroup } from 'reactstrap';
import { ValidatorComponent } from 'react-material-ui-form-validator';

class TextInputValidator extends ValidatorComponent {
    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <FormGroup color={isValid ? 'none' : 'danger'}>
                <Input
                    {...rest}
                    type="text"
                    state={isValid ? 'none' : 'danger'}
                />
                { !isValid && <FormFeedback>{this.getErrorMessage()}</FormFeedback> }
            </FormGroup>
        );
    }
}

export default TextInputValidator;
