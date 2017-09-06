import React from 'react';
import PropTypes from 'prop-types';
import { Label, Button } from 'reactstrap';
import SelectValidator from './inputs/SelectValidator';
import TextInputValidator from './inputs/TextInputValidator';

class FormField extends React.Component {

    generateField(field) {
        let item;
        const { label, containerElement, type, props, text, ...rest } = field;
        if (type === 'select') {
            item = <SelectValidator {...rest} />;
        } else if (type === 'button') {
            item = <Button {...props}>{text}</Button>;
        } else if (type === 'text') {
            item = <TextInputValidator {...rest} />;
        }
        if (label) {
            item = (
                <div>
                    <Label>{label}</Label>
                    {item}
                </div>
            );
        }
        if (containerElement && React.isValidElement(containerElement)) {
            item = React.cloneElement(containerElement, [], item);
        }
        return item;
    }

    render() {
        return this.generateField(this.props.field);
    }
}

FormField.propTypes = {
    field: PropTypes.object,
};

export default FormField;
