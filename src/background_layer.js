var playBG;
var playBG1;
var winsize = cc.director.getWinSize();
var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
var scrollSpeed = 1;

var BackgroundLayer = cc.Layer.extend({
	mapWidth:0,
	mapIndex:0,
	
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        //create the background image and position it at the center of screen
		playBG = new ScrollingBG();
		this.addChild(playBG);
		this.scheduleUpdate();
    },
	update:function(dt) {
		playBG.scroll();
	}
});

var ScrollingBG = cc.Sprite.extend({
	ctor:function() {
		this._super();
		this.initWithFile(res.Menu_BG_png);
	},
	onEnter:function() {
		this.setPosition(160, 480);
	},
	scroll:function() {
		this.setPosition(this.getPosition().x, this.getPosition().y-scrollSpeed);
		if(this.getPosition().y < 0) 
        {
			this.setPosition(this.getPosition().x, this.getPosition().y+420);
		}
	}
});