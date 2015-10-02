var final_score;
var winsize;
var ls = cc.sys.localStorage;

var hs;
var key = "hiscore";

var StatusLayer = cc.Layer.extend({
    labelMeter:null,
	updateRate:0.1,
	score:0,

    onEnter:function () {
		winsize = cc.director.getWinSize();
		
		score=0;
		var labelName = "" + score + " M";

        labelMeter = new cc.LabelTTF(labelName, "Helvetica", 20);
        labelMeter.setPosition(cc.p(winsize.width - 50, winsize.height - 20));
		var yellow = cc.color("#DDDD00");
		labelMeter.setFontFillColor(yellow);
		
		updateRate=0.1;
		
        this.addChild(labelMeter);
		this.schedule(this.updateNumber, updateRate);
    },
	updateNumber:function() {
		score++;
		
		if(labelMeter == null) return;
		labelMeter.setString("" + score + " M");
		
		final_score = score;
	}
});

var PauseLayer = cc.Layer.extend({
	ctor:function() {
		this._super();
		this.init();
	},
	init:function() {
		this._super();
		
		var pauseButton = new cc.MenuItemSprite(
					new cc.Sprite(res.Pause_nope_png),
					new cc.Sprite(res.Pause_yeah_png),
					this.goPause, this);
		var pauseButtonPopUp = new cc.Menu(pauseButton);
		pauseButtonPopUp.setPosition(30, winsize.height - 20);
		this.addChild(pauseButtonPopUp);
	},
	goPause:function() {
		cc.director.pause();
		this.addChild(new PauseMenuLayer());
	}
});

var PauseMenuLayer = cc.Layer.extend({
	ctor:function() {
		this._super();
		this.init();
	},
	init:function() {
		this._super();
		
		var pauseButton = new cc.MenuItemSprite(
					new cc.Sprite(res.Pause_nope_png),
					new cc.Sprite(res.Pause_yeah_png),
					this.goPause, this);
		var pauseButtonPopUp = new cc.Menu(pauseButton);
		pauseButtonPopUp.setPosition(30, winsize.height - 20);
		this.addChild(pauseButtonPopUp);
	},
	goPause:function() {
		cc.director.pause();
		this.addChild(new PauseMenuLayer());
	}
});

var GameOverLayer = cc.Layer.extend({
	ctor:function() {
		this._super();
		this.init();
	},
	init:function() {
		this._super();
		
		var yellow = cc.color("#DDDD00");
		var hiscore = ls.getItem(key);
		
		if(hiscore < final_score) {
			hiscore = final_score;
		}
		ls.setItem(key, hiscore);
		
		var gameOverBG = new cc.Sprite(res.Game_over_BG_png);
		gameOverBG.setPosition(cc.p(160, 260));
		this.addChild(gameOverBG);
		
		var gameOverLabel = new cc.LabelTTF("Game Over", "Helvetica", 40);
        gameOverLabel.setPosition(cc.p(160, 330));
		gameOverLabel.setFontFillColor(yellow);
		this.addChild(gameOverLabel);
		
		var scoreLabel = new cc.LabelTTF(final_score + " M", "Helvetica", 30);
        scoreLabel.setPosition(cc.p(160, 300));
		scoreLabel.setFontFillColor(yellow);
		this.addChild(scoreLabel);	

		var hiscoreLabel = new cc.LabelTTF("Hiscore: " + hiscore + " M", "Helvetica", 30);
        hiscoreLabel.setPosition(cc.p(160, 260));
		hiscoreLabel.setFontFillColor(yellow);
		this.addChild(hiscoreLabel);
		
		var restart = new cc.MenuItemSprite(
				new cc.Sprite(res.Restart_nope_png),
				new cc.Sprite(res.Restart_yeah_png),
				this.goRestart, this);
		var restartMenu = new cc.Menu(restart);
		restartMenu.setPosition(160, 200);
		
		this.addChild(restartMenu);
	},
	goRestart:function() {
		cc.director.resume();
		cc.director.runScene(new gameScene());
	}
});