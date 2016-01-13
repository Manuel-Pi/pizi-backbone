import Backbone from "Backbone";
			
var NotificationView = Backbone.View.extend({
	tagName: "notification",
	className: "container-fluid",
	template:  _.template('<div data-alert class="alert-box <%= type %>" style="margin-bottom: 0"><%= message %><a href="#" class="close">&times;</a></div>'),
	initialize: function(options){
		options = options || {};
		this.duration = options.duration || 3000;
		if($('notification').length === 0){
			this.$el.prependTo('body');
		} else {
			this.$el = $($('notification')[0]);
		}
		this.index = 0;
	},
	success: function(message){
		this.render({
			type: "success",
			message: message
		});
	},
	error: function(message){
		this.render({
			type: "alert",
			message: message
		});
	},
	warn: function(message){
		this.render({
			type: "warning",
			message: message
		});
	},
	notify: function(message){
		this.render({
			message: message
		});
	},
	render: function(news){
		var $news = $(this.template({type: news.type, message: news.message}));
		this.$el.append($news);
		this.$el.foundation();
		setTimeout(function(){
			$news.slideUp();
			$news.find("a.close").click();
		}, this.duration);
	}
});

var PopUpView = Backbone.View.extend({
	tagName: "popup",
	className: "reveal-modal container-fluid small",
	template: _.template('<a class="close-reveal-modal" aria-label="Close">&#215;</a><div class="row message"><%= message %></div><div class="actions right"><button class="ok button">Ok</button><button class="cancel button">Cancel</button></div>'),
	initialize: function(){
		if($('popup').length === 0){
			this.$el.prependTo('body');
		} else {
			this.$el = $($('popup')[0]);
		}
		this.$el.attr('data-reveal', '');
		this.$el.foundation({
			reveal: {
				close_on_background_click: false,
				close_on_esc: false
			}
		});
		this.index = 0;
	},
	events: {
		'click button.cancel': 'onClose',
		'click button.ok': 'onOk'
	},
	confirm: function(options){
		options = options || {};
		this.ok = options.ok;
		this.close = options.close;
		this.render({
			message: options.message
		});
	},
	onClose: function(){
		this.$el.foundation('reveal', 'close');
		if(this.close) this.close();
	},
	onOk: function(){
		this.$el.foundation('reveal', 'close');
		if(this.ok) this.ok();
	},
	renderActions: function(){
		
	},
	render: function(data){
		this.$el.html(this.template(data));
		this.$el.foundation('reveal', 'open');
		this.delegateEvents();
	}
});

export default {
	NotificationView: NotificationView,
	PopUpView: PopUpView
};
