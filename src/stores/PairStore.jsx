import Dispatcher from '../dispatcher/Dispatcher';
import BasicStore from './BasicStore';

class PairStore extends BasicStore {

    constructor() {
        super();
        this._pairs = [];
        this._pair = {};
        this._editForm = false;
        this._rates = [];
        this._register();
    }

    _register() {
        Dispatcher.register((action) => {
            switch (action.type) {
                case 'PAIR_GET_ALL':
                    this._pairs = action.pairs;
                    this.emitChange();
                    this.stopLoading();
                    break;
                case 'PAIR_DELETE':
                    this.emitChange();
                    this.stopLoading();
                    break;
                case 'PAIR_GET_ONE':
                    this._pair = action.pair;
                    this.emitChange();
                    this.stopLoading();
                    break;
                case 'PAIR_CREATE':
                    this.emitChange();
                    this.stopLoading();
                    break;
                case 'PAIR_UPDATE':
                    this.emitChange();
                    this.stopLoading();
                    break;
                case 'PAIR_LOADING_START':
                    this.startLoading();
                    break;
                case 'PAIR_LOADING_STOP':
                    this.stopLoading();
                    break;
                case 'PAIR_EDIT_FORM_OPEN':
                    this._editForm = true;
                    this.emitChange();
                    break;
                case 'PAIR_EDIT_FORM_CLOSE':
                    this._editForm = true;
                    this.emitChange();
                    break;
                case 'PAIR_HISTORICAL':
                    this._rates = action.rates;
                    this.emitChange();
                    break;
                case 'PAIR_ERASE_ALL':
                    this._pairs = [];
                    this._pair = {};
                    break;
                case 'PAIR_ERASE':
                    this._pair = {};
                    break;
                case 'PAIR_ERASE_RATESS':
                    this._rates = [];
                    break;
                default:
                    break;
            }
        });
    }

    getPair() {
        return this._pair;
    }

    getPairs() {
        return this._pairs;
    }

    isEditForm() {
        return this._editForm;
    }

    getRates() {
        return this._rates;
    }
}

export default new PairStore();
