define(['backbone',
		'text!../../html/Popup.html',
		'foundation'],
function(Backbone,
	PopupTemplate,
	foundation){
	return Backbone.View.extend({
		tagName: "popup",
		className: "reveal-modal container-fluid small",
		template: _.template(PopupTemplate),
		initialize: function(){
			if($('popup').length === 0){
				this.$el.prependTo('body');
			} else {
				this.$el = $($('popup')[0]);
			}
			this.$el.attr('data-reveal', '');
			this.index = 0;
		},
		events: {
			'click button.cancel': 'close',
			'click button.ok': 'validate'
		},
		confirm: function(message, callback){
			callback = callback || {};
			this.success = callback.success;
			this.error = callback.error;
			this.render({
				type: "confirm",
				message: message
			});
		},
		close: function(){
			this.$el.foundation('reveal', 'close');
			if(this.error) this.error();
		},
		validate: function(){
			this.$el.foundation('reveal', 'close');
			if(this.success) this.success();
		},
		render: function(data){
			this.$el.html(this.template(data));
			this.$el.foundation({
				reveal: {
					close_on_background_click: false,
					close_on_esc: false
				}
			});
			this.$el.foundation('reveal', 'open');
			this.delegateEvents();
		}
	});
});