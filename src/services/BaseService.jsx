import uuidV4 from 'uuid/v4';
import hash from 'object-hash';
import Api from './Api';

const requestsCache = {};

export default class BaseService {

    constructor() {
        this.serviceId = uuidV4();
    }

    uploadFile(url, file, params) {
        params = params || {};
        if (!(file instanceof Blob)) {
            throw new Error('File should be an instance of Blob');
        }
        return Api.request({
            url,
            method: params.method || 'PUT',
            data: file,
            noAuth: true,
            raw: true,
            headers: [
                {
                    name: 'Content-Type',
                    value: file.type,
                },
            ],
        });
    }

    buildParams(params) {
        if (!params) {
            return '';
        }
        return Object.keys(params).map(key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
        ).join('&');
    }

    makeRequest(params) {
        const requestHash = hash(params);
        const key = this.serviceId + requestHash;

        if (!requestsCache[key]) {
            requestsCache[key] = Api.request(params);
            requestsCache[key]
                .then(() => (delete requestsCache[key]))
                .catch(() => (delete requestsCache[key]));
        }

        return requestsCache[key];
    }
}
