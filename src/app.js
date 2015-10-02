var background;
var gameLayer;
var menuLayer;
var scrollSpeed = 6;

var menuScene = cc.Scene.extend({
	onEnter:function() {
		this._super();
		
		menuLayer = new menu();
		menuLayer.init();
		this.addChild(menuLayer);
	}
});

var menu = cc.Layer.extend({
	init:function() {
		this._super();

		background = new ScrollingBG();
		this.addChild(background);
		
		var start = cc.MenuItemImage.create(
				res.Start_nope_png,
				res.Start_yeah_png,
				this.goPlay, this);
		start.setPosition(160, 240);
		var login = cc.MenuItemImage.create(
				res.Start_nope_png,
				res.Start_yeah_png,
				this.loginFB, this);
		login.setPosition(160, 320);
		var startMenu = cc.Menu.create(start);
		startMenu.setPosition(0,0);
		this.addChild(startMenu);
		
		this.scheduleUpdate();
	},
	goPlay:function() {
		cc.director.runScene(new gameScene);
	},
	loginFB:function() {
		FB.login(function(response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me', function(response) {
					console.log('Good to see you, ' + response.name + '.');
				});
			} 
			else {
				console.log('User cancelled login or did not fully authorize.');
			}
		});
	},
	update:function(dt) {
		background.scroll();
	}
});

var gameScene = cc.Scene.extend({
	onEnter:function() {
		this._super();

		gameLayer = new game();
		gameLayer.init();
		this.addChild(gameLayer);
		this.addChild(new AnimationLayer());
		this.addChild(new StatusLayer());
		this.addChild(new PauseLayer());
	}
});

var game = cc.Layer.extend({
	init:function() {
		this._super();
		background = new ScrollingBG();
		this.addChild(background);
		var size = cc.director.getWinSize();
		
		this.scheduleUpdate();
	},
	update:function(dt) {
		background.scroll();
	}
});

var ScrollingBG = cc.Sprite.extend({
	ctor:function() {
		this._super();
		this.initWithFile("res/menu_bg.png");
	},
	onEnter:function() {
		this.setPosition(160, 420);
	},
	scroll:function() {
        
		this.setPosition(this.getPosition().x, this.getPosition().y-scrollSpeed);
		if(this.getPosition().y<0) {
			this.setPosition(this.getPosition().x, this.getPosition().y+420);
		}
	}

});