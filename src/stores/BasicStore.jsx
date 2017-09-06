import { EventEmitter } from 'events';

class BasicStore extends EventEmitter {

    constructor() {
        super();
        this.setMaxListeners(0);
    }

    stopLoading() {
        this.emitStopLoading();
    }

    startLoading() {
        this.emitLoading();
    }

    emitChange() {
        this.emit('CHANGE');
    }

    emitLoading() {
        this.emit('LOADING');
    }

    emitStopLoading() {
        this.emit('STOP_LOADING');
    }

    addLoadingListener(callback) {
        this.on('LOADING', callback);
    }

    addStopLoadingListener(callback) {
        this.on('STOP_LOADING', callback);
    }

    removeStopLoadingListener(callback) {
        this.removeListener('STOP_LOADING', callback);
    }

    removeLoadingListener(callback) {
        this.removeListener('LOADING', callback);
    }

    addChangeListener(callback) {
        this.on('CHANGE', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('CHANGE', callback);
    }
}

export default BasicStore;
