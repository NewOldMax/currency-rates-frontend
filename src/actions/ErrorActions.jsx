import BaseActions from './BaseActions';

class ErrorActions extends BaseActions {

    showError(errors) {
        this.dispatch({
            type: 'ERROR_OCCURED',
            errors,
        });
    }

    clearErrors() {
        this.dispatch({
            type: 'ERROR_CLEAR',
        });
    }
}

export default new ErrorActions();
