import Backbone from 'backbone';
import WaitView from './views/WaitView';
import PopupView from './views/PopupView';
import NotificationView from './views/NotificationView';
import FormView from './views/FormView';
import Entity from './models/Entity';

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

const viewUtils = {
    table(options) {
        return _.template(`<table class="{{ className }}">
                                <thead>
                                    <tr>
                                        <% columns.forEach(function(column){ %>
                                            <th class="{{ column.class }}">{{ column.header || column.property }}</th>
                                            <% }) %>
                                    </tr>
                                </thead>
                                <tbody>
                                    <% data.forEach(function(entry){ %>
                                        <tr>
                                            <% columns.forEach(function(column){ %>
                                                <td>{{ column.transform ? column.transform(entry[column.property]) : entry[column.property] }}</td>
                                                <% }) %>
                                        </tr>
                                        <% }) %>
                                </tbody>
                            </table>`)(_.default(options, { className: "", data: [], columns: {} }));
    }
};

export default {
    NotificationView,
    PopupView,
    FormView,
    WaitView,
    viewUtils,
    Entity,
    useJwt
};