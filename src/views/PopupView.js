import Backbone from 'backbone';
import FormView from './FormView';

export default Backbone.View.extend({
    tagName: "popup",
    template: _.template(`<div class="background"></div>
						  <div class="container">
						  	<a class="close">&#215;</a>
							<div class="content">
								<% template ? print(template) : print(message) %>
							</div>
							<ul class="actions">
								<li class="ok">Ok</li>
								<li class="custom"><%= customName %></li>
								<li class="cancel">Cancel</li>
							</ul>
						  </div>`),
    initialize() {
        let $popup = document.body.querySelector("popup");
        if (!$popup) document.body.appendChild(this.el);
        else this.el = $popup;
    },
    events: {
        'click .close': 'onClose',
        'click .cancel': 'onClose',
        'click .ok': 'onOk',
        'click .custom': 'onCustom'
    },
    setParam(params) {
        this.type = params.type;
        this.ok = params.ok;
        this.close = params.close;
        this.custom = params.custom;
        this.el.classList.add(params.class);
        this.resizeOff = params.resizeOff;
        var view = this;
        if (params.template) {
            if (params.isform) {
                const view = this;
                const PopupFormView = FormView.extend({
                    initialize() {
                        FormView.prototype.initialize.apply(this, arguments);
                    },
                    submit(params = {}) {
                        FormView.prototype.submit.apply(this, arguments);
                        view.closePopup();
                    }
                });
                this.view = new PopupFormView(params);
            } else if (params.template instanceof Backbone.View) {
                this.view = params.template;
            }
            if (this.view && this.view.ok) {
                var ok = params.ok;
                params.ok = () => view.view.ok(ok);
            }
            this.ok = params.ok || this.ok;
        } else {
            this.view = null;
        }
    },
    basic(options = {}) {
        this.setParam(options);
        this.render(options);
        return this;
    },
    form(options = {}) {
        options.isform = true;
        this.setParam(options);
        this.render(options);
        return this;
    },
    onClose() {
        if (this.close) this.close.apply(this, [this.callbackArgs()]);
        this.closePopup();
    },
    onOk() {
        if (this.ok) this.ok.apply(this, [this.callbackArgs()]);
        if (this.type !== 'form' || this.view.isValid) this.closePopup();
    },
    onCustom() {
        if (this.custom) this.custom.apply(this, [this.callbackArgs()]);
        this.closePopup();
    },
    closePopup() {
        if (this.view) this.view.remove();
        this.remove();
    },
    callbackArgs() {
        let valid = true;
        let args = [];
        if (this.type === 'form') {
            valid = this.view.check();
            args.push(this.view.getValues());
            args.push(valid);
        }
        args.push(this);
        return args;
    },
    renderActions(staticActions) {
        this.el.getElementsByClassName('ok')[0].style.display = this.ok ? '' : 'none';
        this.el.getElementsByClassName('.cancel')[0].style.display = this.close ? '' : 'none';
        this.el.getElementsByClassName('.custom')[0].style.display = this.custom ? '' : 'none';
        this.el.getElementsByClassName('.actions')[0].style.display = !this.ok && !this.close && !this.custom ? '' : 'none';
        if (staticActions) {
            this.el.getElementsByClassName('.actions').classList.add("static");
            this.el.classList.add("static-actions");
        } else {
            this.el.getElementsByClassName('.actions').classList.remove("static");
            this.el.classList.remove("static-actions");
        }
    },
    render(data = {}) {
        data = _.extend({
            message: "",
            customName: "",
            template: ""
        }, _.pick(data, ['message', 'customName', 'template', 'staticActions']));
        this.$el.html(this.template(data)).css('display', 'flex');
        this.renderActions(data.staticActions);
        if (this.view) {
            this.view.render();
            this.$el.find('.content').html(this.view.$el);
        }
        this.delegateEvents();
    }
});