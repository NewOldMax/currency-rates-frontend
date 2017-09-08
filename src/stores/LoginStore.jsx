import jwtPayloadDecoder from 'jwt-payload-decoder';
import Dispatcher from '../dispatcher/Dispatcher';
import BasicStore from './BasicStore';

class LoginStore extends BasicStore {

    constructor() {
        super();
        this._jwt = localStorage.hasOwnProperty('jwt') ? localStorage.getItem('jwt') : null;
        this._refreshToken = localStorage.hasOwnProperty('refreshToken') ? localStorage.getItem('refreshToken') : null;
        this._user = {};

        if (this._jwt) {
            const payload = jwtPayloadDecoder.getPayload(this._jwt);
            this._user.active = payload.active;
            this._user.role = payload.role;
        }
        this._register();
    }

    _register() {
        Dispatcher.register((action) => {
            switch (action.type) {
                case 'LOGIN':
                    this._jwt = action.jwt;
                    this.emitChange();
                    this.stopLoading();
                    break;
                case 'LOGIN_ERASE':
                    this.eraseLogin();
                    this.emitChange();
                    this.stopLoading();
                    break;
                case 'LOGIN_REFRESH_TOKEN':
                    this._jwt = action.jwt;
                    localStorage.setItem('jwt', action.jwt);
                    this.emitChange();
                    break;
                case 'LOGIN_LOADING_START':
                    this.startLoading();
                    break;
                case 'LOGIN_LOADING_STOP':
                    this.stopLoading();
                    break;
                default:
                    break;
            }
        });
    }

    eraseLogin() {
        this._user = null;
        this._jwt = null;
        this._permissions = null;
        this._refreshToken = null;
        localStorage.removeItem('jwt');
        localStorage.removeItem('refreshToken');
        location.href = '/';
    }

    getToken() {
        return this._jwt;
    }

    isLoggedIn() {
        return !(this._jwt === null);
    }
}

export default new LoginStore();
