import BaseActions from './BaseActions';
import LoginService from '../services/LoginService';

class LoginActions extends BaseActions {

    eraseLogin() {
        this.dispatch({
            type: 'LOGIN_ERASE',
        });
    }

    useRefreshToken() {
        const jwt = localStorage.getItem('jwt');
        const refreshToken = localStorage.getItem('refreshToken');
        return LoginService.refreshToken(jwt, refreshToken).then(data =>
            this.dispatch({
                type: 'LOGIN_REFRESH_TOKEN',
                jwt: JSON.parse(data).token,
            }),
        ).catch(() => this.eraseLogin());
    }

    logoutFromAllDevices() {
        return LoginService.logoutFromAllDevices().then((data) => {
            data = JSON.parse(data);
            localStorage.setItem('jwt', data.token);
            this.dispatch({
                type: 'LOGIN',
                jwt: data.token,
            });
        });
    }

    logout() {
        return LoginService.logout()
            .then(() => this.eraseLogin())
            .catch(() => this.eraseLogin());
    }
}

export default new LoginActions();
