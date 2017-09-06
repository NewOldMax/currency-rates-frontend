import React from 'react';
import Dispatcher from '../dispatcher/Dispatcher';
import BasicStore from './BasicStore';

class HeaderStore extends BasicStore {

    constructor() {
        super();
        this._title = '';
        this._action = '';
        this._register();
    }

    _register() {
        Dispatcher.register((action) => {
            switch (action.type) {
                case 'HEADER_CHANGE_TITLE':
                    this._title = action.title;
                    this.emitChange();
                    break;
                default:
                    break;
            }
        });
    }

    getTitle() {
        return this._title;
    }

    getAction() {
        return this._action;
    }
}

export default new HeaderStore();
