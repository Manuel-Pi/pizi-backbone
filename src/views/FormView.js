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
        this.el.querySelectorAll(`input[name="${name}"]`).classList.add(this.errorClass);
    },
    getValues() {
        return new FormData(this.el);
    },
    getObject() {
        let object = {};
        _.each(this.getValues(), (attribute) => object[attribute.name] = attribute.value);
        return object;
    },
    check(displayError = false) {
        let valid = true;
        for (const index in this.validate) {
            const rule = this.validate[index];
            let el = this.el.querySelectorAll('*[name="' + rule.name + '"]');
            if (el.length && !el[0].value.match(rule.regex)) {
                if (displayError && !el[0].classList.contains(this.errorClass || 'error')) {
                    el[0].classList.add(this.errorClass || "error");
                    el[0].insertAdjacentHTML('afterend', '<small class="' + (this.errorClass || "error") + '">' + rule.message + '</small>');
                }
                valid = false;
            } else if (displayError && el.length) {
                el[0].classList.remove(this.errorClass || 'error');
                let $next = el[0].nextElementSibling;
                if ($next && $next.tagName === "SMALL") $next.parentNode.removeChild($next);
            }
        }
        this.isValid = valid;
        return valid;
    },
    submit(params = {}) {
        params = !params.currentTarget ? _.extend(this.params, params) : this.params;
        if (params.type.toUpperCase() !== 'GET') params.data = new FormData(this.el);
        var request = new XMLHttpRequest();
        request.open(params.type, params.url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(params.data);
    },
    render(options = {}) { if (this.template) this.el.innerHTML = this.template; }
});