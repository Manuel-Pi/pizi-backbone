import Backbone from "Backbone";
			
let NotificationView = Backbone.View.extend({
	tagName: "notification",
	className: "container-fluid",
	template:  _.template(`
        <div data-alert class="alert-box <%= type %>" style="margin-bottom: 0;
															 padding-top: 5px;
      														 padding-bottom: 5px;">
            <%= message %><a href="#" class="close">&times;</a>
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
			'width': '100%'
		});
	},
	success(message){
		this.render({
			type: "success",
			message: message
		});
	},
	error(message){
		this.render({
			type: "alert",
			message: message
		});
	},
	warn(message){
		this.render({
			type: "warning",
			message: message
		});
	},
	notify(message){
		this.render({
			message: message
		});
	},
	render(news){
		let $news = $(this.template({type: news.type, message: news.message}));
		this.$el.append($news);
		this.$el.foundation();
		setTimeout(() => {
			$news.slideUp();
			$news.find("a.close").click();
		}, this.duration);
	}
});

let PopupView = Backbone.View.extend({
	tagName: "popup",
	className: "reveal-modal container-fluid small",
	template: _.template(`
        <a class="close-reveal-modal" aria-label="Close">&#215;</a>
        <div style="overflow-x: hidden;
                    overflow-y: auto;
                    height: 100%;
                    width:100%;">
            <div class="row content" style="overflow:hidden;
                                            padding-right: 10px;
                                            word-wrap: break-word;
											text-align: justify;">
                <%= message %>
            </div>
            <div class="actions right" style="margin-top: 30px;
                                              margin-right: 10px;
                                              overflow: hidden;">
                <button class="ok button" style="margin:0;">Ok</button>
                <button class="custom button" style="margin:0;"><%= customName %></button>
                <button class="cancel button" style="margin:0;">Cancel</button>
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
				close_on_esc: false
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
        });
		$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
            view.resize();
        });
        this.$el.css({
            'padding-top': '50px',
            'padding-right': 'calc(1.875rem - 10px)'
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
	alert(message){
		this.type = 'alert';
		this.ok = true;
		this.close = null;
		this.custom = null;
		this.render({
			message: message
		});
	},
	onClose(){
		this.$el.foundation('reveal', 'close');
		if(this.close && this.type === 'confirm') this.close(this);
	},
	onOk(){
		this.$el.foundation('reveal', 'close');
		if(this.ok && this.type === 'confirm') this.ok(this);
	},
    onCustom(){
		this.$el.foundation('reveal', 'close');
		if(this.custom && this.type === 'confirm') this.custom(this);
	},
	renderActions: function(){
        if(this.ok){
            this.$el.find('.ok').show(); 
        } else {
            this.$el.find('.ok').hide();  
        }
        if(this.close){
            this.$el.find('.cancel').show(); 
        } else {
            this.$el.find('.cancel').hide();  
        }
        if(this.custom){
            this.$el.find('.custom').show(); 
        } else {
            this.$el.find('.custom').hide();  
        }
        if(!this.ok && !this.close && !this.custom){
            this.$el.find('.actions').hide();
        } else {
            this.$el.find('.actions').show();
        }
    },
    resize: function(){
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
			customName: ""
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
