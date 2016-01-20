import Backbone from "Backbone";		
let NotificationView = Backbone.View.extend({
	tagName: "notification",
	className: "container-fluid",
	template:  _.template(`
        <div data-alert class="alert-box <%= type %>" style="margin-bottom: 0;
															 padding-top: 5px;
      														 padding-bottom: 5px;">
            <%= message %><a class="close">&times;</a>
        </div>`),
	initialize(options = {}){
		this.duration = options.duration || 3000;
		if($('notification').length === 0){
			this.$el.prependTo('body');
		} else {
			this.$el = $($('notification')[0]);
		}
		this.$el.css({
			'position': 'fixed',
			'top': '0',
			'width': '100%',
			'z-index': '1000'
		});
	},
	success(message, options = {}){
		this.render({
			type: "success",
			message: message
		}, options);
	},
	error(message, options = {}){
		this.render({
			type: "alert",
			message: message
		}, options);
	},
	warn(message, options = {}){
		this.render({
			type: "warning",
			message: message
		}, options);
	},
	notify(message, options = {}){
		this.render({
			message: message
		}, options);
	},
	render(news, options = {}){
		let $news = $(this.template({type: news.type, message: news.message}));
		this.$el.append($news);
		if(!options.permanent){
			setTimeout(() => {
				$news.slideUp();
				$news.find("a.close").click();
			}, options.duration || this.duration);
		}
		if(!this.foundationInitilized){
			$(document).foundation('alert', 'reflow');
			this.foundationInitilized = true;
		}
	}
});

let PopupView = Backbone.View.extend({
	tagName: "popup",
	className: "reveal-modal container-fluid small",
	template: _.template(`
        <a class="close-reveal-modal" aria-label="Close">&#215;</a>
        <div>
            <div class="row content">
                <% template ? print(template) : print(message) %>
            </div>
            <div class="actions right">
                <button class="ok button">Ok</button>
                <button class="custom button"><%= customName %></button>
                <button class="cancel button">Cancel</button>
            </div>
        </div>`),
	initialize(){
		if($('popup').length === 0){
			this.$el.prependTo('body');
		} else {
			this.$el = $($('popup')[0]);
		}
		this.$el.attr('data-reveal', '');
		this.$el.foundation({
			reveal: {
				close_on_background_click: false,
				dismiss_modal_class: 'close-modal',
				close_on_esc: false,
				animation: 'none'
			}
		});
		let view = this;
		$(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
            if(view.basicView){
                    view.basicView.remove();
                    view.basicView = null;
                    view.undelegateEvents();
            }
            window.removeEventListener('resize', this.resize);
			$('body').css('overflow', 'auto');
        });
		$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
            view.resize();
			$('body').css('overflow', 'hidden');
        });
	},
	events: {
		'click a.close-reveal-modal': 'onClose',
        'click button.cancel': 'onClose',
		'click button.ok': 'onOk',
        'click button.custom': 'onCustom'
	},
	confirm(options = {}){
		this.type = 'confirm';
		this.ok = options.ok;
		this.close = options.close;
        this.custom = options.custom;
		this.render({
			message: options.message,
            customName: options.customName
		});
	},
	alert(message = ""){
		this.type = 'alert';
		this.ok = true;
		this.close = null;
		this.custom = null;
		this.render({
			message: message
		});
	},
	form(options = {}){
		this.type = 'form';
		this.ok = options.ok;
		this.close = options.close;
        this.custom = options.custom;
		this.render({
			template: options.template,
			customName: options.customName
		});
	},
	onClose(){
		this.$el.foundation('reveal', 'close');
		if(this.close && this.type === 'confirm') this.close(this);
	},
	onOk(){
		this.$el.foundation('reveal', 'close');
		if(this.ok && this.type === 'confirm'){
			this.ok(this);
		}
		else if(this.ok && this.type === 'form'){
			let data = this.$el.find('form').serializeArray();
			this.ok(this, data);
		}
	},
    onCustom(){
		this.$el.foundation('reveal', 'close');
		if(this.custom && this.type === 'confirm') this.custom(this);
	},
	renderActions(){
		this.$el.find('.ok')[this.ok ? 'show' : 'hide']();
		this.$el.find('.cancel')[this.close ? 'show' : 'hide']();
		this.$el.find('.custom')[this.custom ? 'show' : 'hide']();
		this.$el.find('.actions')[!this.ok && !this.close && !this.custom ? 'hide' : 'show']();
    },
    resize(){
        var $popup = $('popup');
        $popup.height("");
        var bodyHeight = $('body').height() - 10;
        var height = $popup.outerHeight();
        var top = 5;
        if(height > bodyHeight){
            $popup.outerHeight(bodyHeight);
        } else {
            top = (bodyHeight + 10 - height) / 2;
        }
        $popup.css('top', top > 100 ? 100 : top + 'px');
    },
	render(data = {}){
		data = _.extend({
			message: "",
			customName: "",
			template: ""
		}, data);
		this.$el.html(this.template(data));
        this.renderActions();
        window.addEventListener('resize', this.resize, true);
		this.$el.foundation('reveal', 'open');
		this.delegateEvents();
	}
});

export default {
	NotificationView: NotificationView,
	PopupView: PopupView
};
