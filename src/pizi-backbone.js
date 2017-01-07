import Backbone from 'backbone';
import WaitView from './views/WaitView';
import PopupView from './views/PopupView';
import NotificationView from './views/NotificationView';
import FormView from './views/FormView';

// Add token in REST request
const useJwt = (options = { token() {}, onUnauthorized() {} }) => {
    const sync = Backbone.sync;
    Backbone.sync = (method, model, opts) => {
        const token = options.token();
        if (token) opts.beforeSend = (xhr) => { xhr.setRequestHeader(options.header || 'authorization', 'Bearer ' + token); };
        let err = opts.error;
        opts.error = (param) => {
            if (param.status && param.status === 401) options.onUnauthorized();
            err(param);
        };
        sync(method, model, opts);
    };
};

export default {
    NotificationView,
    PopupView,
    FormView,
    WaitView,
    useJwt
};