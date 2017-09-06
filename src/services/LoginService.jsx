import BaseService from './BaseService';

class LoginService extends BaseService {

    logout() {
        return this.makeRequest({
            url: 'logout',
            method: 'GET',
        });
    }

    refreshToken(jwt, refreshToken) {
        return this.makeRequest({
            url: 'token/refresh',
            data: {
                token: jwt,
                refresh_token: refreshToken,
            },
            noAuth: true,
        });
    }

    logoutFromAllDevices() {
        return this.makeRequest({
            url: 'token/remove-refresh',
            method: 'GET',
        });
    }
}

export default new LoginService();
