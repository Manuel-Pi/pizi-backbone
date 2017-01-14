import Backbone from 'backbone';

export default Backbone.View.extend({
    template: _.template(`<div class="background" style="display:block"></div><div class="message pulse"><%= message %><div class="anim"></div></div>`),
    tagName: "wait",
    initialize() {
        let $body = document.body;
        if ($body.querySelectorAll('wait').length === 0) $body.appendChild(this.el);
        else this.el = $body.querySelector('wait');
    },
    start(message, $el) {
        if (message instanceof Element) {
            $el = message;
            message = null;
        }
        let $template = this.template({ message: message || 'loading...' });
        let $parent = $el || document.body;
        $parent.classList.add('wait-container');
        $parent.classList.add('hide-child');
        if ($el) {
            let $wait = new document.createElement("wait");
            $wait.style.display = "block";
            $wait.insertBefore($template, $wait.firstChild);
            $parent.insertBefore($wait, parent.firstChild);
        } else {
            this.el.innerHTML = $template;
            this.el.style.display = "block";
        }
        return {
            stop: (callback) => this.stop($el, callback)
        };
    },
    stop($el, callback) {
        callback = _.isFunction($el) ? $el : callback;
        let $wait = $el && $el.querySelector('wait') || this.el;
        let $parent = $el || document.body;
        let elements = $wait.querySelectorAll('.background, .message');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('pulse');
            elements[i].style.opacity = 0;
        }
        $parent.classList.remove('hide-child');
        setTimeout(() => {
            $parent.classList.remove('wait-container');
            $wait.style.display = "none";
            $wait.innerHTML = "";
            if ($el) $wait.parentNode.removeChild($wait);
            if (callback) callback();
        }, 1500);
    }
});