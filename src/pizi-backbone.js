import Backbone from "Backbone";

let FormView = Backbone.View.extend({
	tagName: "form",
	initialize(options){
		this.template = options.template;
		this.validate = options.validate;
	},
	inputError(name, error){
		this.$el.find(`input[name="${name}"]`).addClass('error');
	},
	getValues(){
		return this.$el.serializeArray();
	},
	check(){
		let valid = true;
		let i = this.validate.length;
		while(i--){
			let rule = this.validate[i];
			let el = this.$el.find('*[name="' + rule.name + '"]');
			if(el.length && !el.val().match(rule.regex)){
				if(!el.hasClass('error')){
					el.addClass('error');
					el.after('<small class="error">' + rule.message + '</small>');
				}
				valid = false;
			} else if(el.length){
				el.removeClass('error');
				el.next('small.error').remove();
			}
		}
		this.isValid = valid;
		return valid;
	},
	render(options = {}){
		if(this.template) this.$el.html(this.template);
	}
});

let NotificationView = Backbone.View.extend({
	tagName: "notification",
	className: "container-fluid",
	template:  _.template(`<div data-alert class="alert-box <%= type %>">
            			   	<%= message %><a class="close">&times;</a>
        				   </div>`),
	initialize(options = {}){
		this.duration = options.duration || 3000;
		if($('notification').length === 0){
			this.$el.prependTo('body');
		} else {
			this.$el = $($('notification')[0]);
		}
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
	template: _.template(`<a class="close-reveal-modal" aria-label="Close">&#215;</a>
						  <div>
							<div class="row content">
								<% template ? print(template) : print(message) %>
							</div>
							<ul class="actions button-group right">
								<li class="ok"><a class="button">Ok</a></li>
								<li class="custom"><a class="button"><%= customName %></a></li>
								<li class="cancel"><a class="button alert">Cancel</a></li>
							</ul>
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
		$(document).on('closed.fndtn.reveal', '[data-reveal]',()=>{
            window.removeEventListener('resize', this.resize);
			$('body').css('overflow', 'auto');
        });
		$(document).on('opened.fndtn.reveal', '[data-reveal]',()=>{
			view.resize();
			window.addEventListener('resize', this.resize, true);
			$('body').css('overflow', 'hidden');
        });
	},
	events: {
		'click .close-reveal-modal': 'onClose',
        'click .cancel': 'onClose',
		'click .ok': 'onOk',
        'click .custom': 'onCustom'
	},
	setParam(params){
		this.type = params.type;
		this.ok = params.ok;
		this.close = params.close;
		this.custom = params.custom;
		if(params.template){
			this.view =  params.template instanceof FormView ? params.template : new FormView({template: params.template, validate: params.validate});
		} else {
			this.view = null;
		}
	},
	basic(options = {}){
		options.type = 'popup';
		this.setParam(options);
		this.render(options);
	},
	form(options = {}){
		options.type = 'form';
		this.setParam(options);
		this.render(options);
	},
	onClose(){
		if(this.close) this.close.apply(this, this.callbackArgs());
		this.closePopup();
	},
	onOk(){
		if(this.ok) this.ok.apply(this, this.callbackArgs());
		if(this.type === 'form' && this.view.isValid) this.closePopup();
	},
    onCustom(){
		if(this.custom) this.custom.apply(this, this.callbackArgs());
		this.closePopup();
	},
	closePopup(){
		this.$el.foundation('reveal', 'close');
	},
	callbackArgs(){
		let valid = true;
		let args = [];
		if(this.type === 'form'){
			valid = this.view.check();
			args.push(this.view.getValues());
			args.push(valid);
		}
		args.push(this);
		return args;
	},
	renderActions(staticActions){
		this.$el.find('.ok')[this.ok ? 'show' : 'hide']();
		this.$el.find('.cancel')[this.close ? 'show' : 'hide']();
		this.$el.find('.custom')[this.custom ? 'show' : 'hide']();
		this.$el.find('.actions')[!this.ok && !this.close && !this.custom ? 'hide' : 'show']();
		staticActions = staticActions ? 'addClass': 'removeClass' ;
		this.$el.find('.actions')[staticActions]('static');
		this.$el[staticActions]('static-actions');
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
		}, _.pick(data, ['message', 'customName', 'template', 'staticActions']));
		this.$el.html(this.template(data));
		if(this.view){
			this.view.render();
			this.$el.find('.content').html(this.view.$el);
		}
        this.renderActions(data.staticActions);
		this.$el.foundation('reveal', 'open');
		this.delegateEvents();
	}
});

export default {
	NotificationView,
	PopupView,
	FormView
};
