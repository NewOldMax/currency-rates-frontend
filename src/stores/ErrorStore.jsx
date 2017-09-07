import Dispatcher from '../dispatcher/Dispatcher';
import BasicStore from './BasicStore';

class ErrorStore extends BasicStore {

    constructor() {
        super();
        this._errors = [];
        this._register();
    }

    _register() {
        Dispatcher.register((action) => {
            switch (action.type) {
                case 'ERROR_OCCURED':
                    this._errors = action.errors;
                    this.emitChange();
                    break;
                case 'ERROR_CLEAR':
                    this._errors = [];
                    this.emitChange();
                    break;
                default:
                    break;
            }
        });
    }

    getErrors() {
        return this._errors;
    }
}

export default new ErrorStore();
