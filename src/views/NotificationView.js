import Backbone from 'backbone';

export default Backbone.View.extend({
    tagName: "notification",
    className: "container-fluid",
    template: _.template(`<h3 class="notif <%= className %>"><%= message %><a class="close">&times;</a></h3>`),
    initialize(options = {}) {
        let $notif = document.body.getElementsByTagName('notification')[0];
        if (!$notif) document.body.appendChild(this.el);
        else this.el = $notif;
        this.duration = options.duration || 3000;
        this.template = options.template || this.template;
    },
    events: {
        'click .close': 'close'
    },
    close(event, childEvent) {
        const $notif = event.target ? event.target.parentNode : event;
        $notif.style.height = 0;
        $notif.style.marginTop = 0;
        $notif.style.marginBottom = 0;
        $notif.style.paddingTop = 0;
        $notif.style.paddingBottom = 0;
        let styles = getComputedStyle($notif);
        const duration = styles && styles.transitionDuration ? parseFloat(styles.transitionDuration) : 0;

        setTimeout(() => {
            if ($notif && $notif.parentNode) $notif.parentNode.removeChild($notif);
        }, duration * 1000);
    },
    success(message, options = {}) { this.render({ className: "success", message: message }, options); },
    error(message, options = {}) { this.render({ className: "alert", message: message }, options); },
    warn(message, options = {}) { this.render({ className: "warning", message: message }, options); },
    notify(message, options = {}) { this.render({ message: message }, options); },
    render(notif, options = {}) {

        const wrapper = document.createElement("div");
        wrapper.innerHTML = this.template({ className: notif.className, message: notif.message });
        const $notif = wrapper.lastChild;
        this.el.appendChild($notif);
        if (!options.permanent) setTimeout(() => { this.close($notif); }, options.duration || this.duration);
    }
});