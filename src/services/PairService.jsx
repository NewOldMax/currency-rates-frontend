import BaseService from './BaseService';

class PairService extends BaseService {

    createPair(data) {
        return this.makeRequest({
            url: 'pairs',
            data,
        });
    }

    updatePair(id, data) {
        return this.makeRequest({
            url: `pairs/${id}`,
            method: 'PATCH',
            data,
        });
    }

    getPairs() {
        return this.makeRequest({
            url: 'pairs',
            method: 'GET',
        });
    }

    getPair(id) {
        return this.makeRequest({
            url: `pairs/${id}`,
            method: 'GET',
        });
    }

    getHistoricalInfo(id, groupBy) {
        const params = this.buildParams({ groupBy });
        return this.makeRequest({
            url: `pairs/${id}/historical?${params}`,
            method: 'GET',
        });
    }

    deletePair(id) {
        return this.makeRequest({
            url: `pairs/${id}`,
            method: 'DELETE',
        });
    }
}

export default new PairService();
