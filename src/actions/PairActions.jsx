import BaseActions from './BaseActions';
import PairService from '../services/PairService';

class PairActions extends BaseActions {

    getPairs() {
        return PairService.getPairs().then((data) => {
            data = JSON.parse(data);
            this.dispatch({
                type: 'PAIR_GET_ALL',
                pairs: data.pairs,
            });
        });
    }

    getPair(id) {
        return PairService.getPair(id).then((data) => {
            data = JSON.parse(data);
            this.dispatch({
                type: 'PAIR_GET_ONE',
                pair: data.pair,
            });
        });
    }

    showEditForm(id) {
        if (id) {
            this.getPair(id);
        }
        this.dispatch({
            type: 'PAIR_EDIT_FORM_OPEN',
        });
    }

    closeEditForm() {
        this.dispatch({
            type: 'PAIR_EDIT_FORM_CLOSE',
        });
    }

    createPair(data) {
        return PairService.createPair(data).then(() => {
            this.dispatch({
                type: 'PAIR_CREATE',
            });
        }).catch((errors) => {
            this.dispatch({
                type: 'ERROR_OCCURED',
                errors: JSON.parse(errors).errors,
            });
        });
    }

    updatePair(id, data) {
        return PairService.updatePair(id, data).then(() => {
            this.dispatch({
                type: 'PAIR_UPDATE',
            });
        }).catch((errors) => {
            this.dispatch({
                type: 'ERROR_OCCURED',
                errors: JSON.parse(errors).errors,
            });
        });
    }

    deletePair(id) {
        return PairService.deletePair(id).then(() => {
            this.dispatch({
                type: 'PAIR_DELETE',
            });
        }).catch((errors) => {
            this.dispatch({
                type: 'ERROR_OCCURED',
                errors: JSON.parse(errors).errors,
            });
        });
    }

    getHistoricalInfo(id, groupBy) {
        return PairService.getHistoricalInfo(id, groupBy).then((data) => {
            this.dispatch({
                type: 'PAIR_HISTORICAL',
                rates: JSON.parse(data).rates,
            });
        });
    }

    erasePairs() {
        this.dispatch({
            type: 'PAIR_ERASE_ALL',
        });
    }

    erasePair() {
        this.dispatch({
            type: 'PAIR_ERASE',
        });
    }

    eraseRates() {
        this.dispatch({
            type: 'PAIR_ERASE_RATESS',
        });
    }
}

export default new PairActions();
