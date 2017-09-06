import Dispatcher from '../dispatcher/Dispatcher';

class BaseActions {
    dispatch(payload) {
        setTimeout(() => {
            Dispatcher.dispatch(payload);
        }, 1);
    }
}

export default BaseActions;
