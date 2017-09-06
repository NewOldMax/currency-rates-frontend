import BaseActions from './BaseActions';

class HeaderActions extends BaseActions {

    setTitle(title) {
        this.dispatch({
            type: 'HEADER_CHANGE_TITLE',
            title,
        });
    }

    setAction(action) {
        this.dispatch({
            type: action,
        });
    }

    eraseAction() {
        this.dispatch({
            type: 'HEADER_ERASE_ACTION',
        });
    }
}

export default new HeaderActions();
