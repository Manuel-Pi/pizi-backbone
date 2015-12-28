define(['backbone',
		'text!../../html/Notification.html',
		'foundation'],
function(Backbone,
	NotificationTemplate,
	foundation){
	return Backbone.View.extend({
		tagName: "notification",
		className: "container-fluid",
		template:  _.template(NotificationTemplate),
		initialize: function(){
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
		render: function(news){
			var $news = $(this.template({type: news.type, message: news.message}));
			this.$el.append($news);
			this.$el.foundation();
			setTimeout(function(){
				$news.slideUp();
      			$news.find("a.close").click();
			}, 3000);
		}
	});
});