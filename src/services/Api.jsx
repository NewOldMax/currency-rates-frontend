import Promise from 'promise-polyfill';
import LoginAction from '../actions/LoginActions';
import config from '../config';

class Api {

    constructor() {
        const { schema, host, port } = config.config;
        this.route = `${schema}://${host}:${port}/api/`;
    }

    request({ url, data, method, headers, noAuth, login, raw, responseType, defaultContentType }) {
        const promise = new Promise((resolve, reject) => {
            const setDefaultContentType = (defaultContentType !== false);
            let xhr = new XMLHttpRequest();
            const requestMethod = method || 'POST';
            const route = this.getRouteForUrl(url);
            if ('withCredentials' in xhr) {
                // Most browsers.
                xhr.open(requestMethod, route, true);
            } else if (typeof XDomainRequest !== 'undefined') {
                // IE8 & IE9
                xhr = new XDomainRequest();
                xhr.open(requestMethod, route);
            } else {
                // CORS not supported.
                xhr = null;
                reject('CORS is not supported.');
            }
            if (setDefaultContentType) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }
            if (headers) {
                headers.map(header => xhr.setRequestHeader(header.name, header.value));
            }
            if (localStorage.hasOwnProperty('jwt') && !noAuth) {
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
            }
            if (responseType) {
                xhr.responseType = responseType;
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
                        let result;
                        if (responseType && responseType === 'arraybuffer') {
                            result = xhr.response;
                        } else {
                            result = xhr.responseText;
                        }
                        resolve(result);
                    } else {
                        if (xhr.status === 401 && !login) {
                            LoginAction.useRefreshToken().then(() => {
                                // eslint-disable-next-line
                                this.request.apply(this, arguments)
                                .then(result => resolve(result))
                                .catch(result => reject(result));
                            });
                        }
                        if (xhr.status !== 401) {
                            reject(xhr.responseText);
                        }
                    }
                }
            };
            xhr.send(data ? (raw ? data : JSON.stringify(data)) : '');
        });
        return promise;
    }

    getRouteForUrl(url) {
        if (url.indexOf('//') === 0) {
            return url;
        }

        if (url.indexOf('http') !== -1) {
            return url;
        }

        return `${this.route}${url}`;
    }
}

export default new Api();
