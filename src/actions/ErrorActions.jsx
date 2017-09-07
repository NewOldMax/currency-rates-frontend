import BaseActions from './BaseActions';

class ErrorActions extends BaseActions {

    showError(errors) {
        this.dispatch({
            type: 'ERROR_OCCURED',
            errors,
        });
    }

    clearError() {
        this.dispatch({
            type: 'ERROR_CLEAR',
        });
    }
}

export default new ErrorActions();
