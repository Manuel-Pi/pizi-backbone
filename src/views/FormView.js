import Backbone from 'backbone';

export default Backbone.View.extend({
    tagName: "form",
    initialize(options = { errorClass: 'error', validate: [] }) {
        this.params = _.extend({
            type: 'POST',
            processData: false,
            contentType: false,
            cache: false
        }, _.omit(options, ['template', 'validate', 'errorClass']));
        this.template = options.template;
        this.validate = options.validate;
        this.errorClass = options.errorClass;
    },
    events: {
        'click .submit': 'submit'
    },
    inputError(name, error) {
        this.el.querySelectorAll(`input[name="${name}"]`).className += (this.errorClass);
    },
    getValues() {
        return this.$el.serializeArray();
    },
    getObject() {
        let object = {};
        _.each(this.getValues(), (attribute) => object[attribute.name] = attribute.value);
        return object;
    },
    check() {
        let valid = true;
        for (const rule in this.validate) {
            let el = this.el.querySelectorAll('*[name="' + rule.name + '"]');
            if (el.length && !el[0].value.match(rule.regex)) {
                if (!el.classList.contains(this.errorClass)) {
                    el.classList.push(this.errorClass);
                    el.insertAdjacentHTML('afterend', '<small class="' + this.errorClass + '">' + rule.message + '</small>');
                }
                valid = false;
            } else if (el.length) {
                el.classList.remove(this.errorClass);
                let $next = el.nextElementSibling;
                if ($next.tagName === "small") $next.parentNode.removeChild($next);
            }
        }
        this.isValid = valid;
        return valid;
    },
    submit(params = {}) {
        params = !params.currentTarget ? _.extend(this.params, params) : this.params;
        if (params.type.toUpperCase() !== 'GET') params.data = new FormData(this.el);
        $.ajax(params);
        var request = new XMLHttpRequest();
        request.open(params.type, params.url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(params.data);
    },
    render(options = {}) { if (this.template) this.$el.html(this.template); }
});