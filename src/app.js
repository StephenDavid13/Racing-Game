var background;
var gameLayer;
var scrollSpeed = 1;

var gameScene = cc.Scene.extend({
	labelNumber:null,
	number:0,
	updateRate:0.1,
	onEnter:function() {
		this._super();
		gameLayer = new game();
		gameLayer.init();
		this.addChild(gameLayer);
		this.addChild(new AnimationLayer());
		
		number = 0;
		
		var labelName = "" + number;
		var winsize = cc.director.getWinSize();
		
		this.labelNumber = new cc.LabelTTF(labelName + " M", "Helvetica", 20);
		this.labelNumber.setPosition(cc.p(winsize.width - 60, winsize.height - 20));
		
		updateRate = 0.1;
		
		this.addChild(this.labelNumber);
		
		this.schedule(this.updateNumber, updateRate);
	},
	updateNumber:function() {
		number++;
		if(this.labelNumber == null) return;
		this.labelNumber.setString("" + number + " M");
	}
});

var game = cc.Layer.extend({
	init:function() {
		this._super();
		background = new ScrollingBG();
		this.addChild(background);
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
        
		this.setPosition(this.getPosition().x, this.getPosition().y-5);
		if(this.getPosition().y<0) {
			this.setPosition(this.getPosition().x, this.getPosition().y+420);
		}
	}

});