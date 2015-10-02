var MAX_MOVES = 2;
var ONE_MOVE = 70;
var enemies;

var AnimationLayer = cc.Layer.extend({
    goleft: MAX_MOVES,
    goright: MAX_MOVES,
    ctor:function () {
        this._super();
        this.init();     
    },
    init:function() {
        this._super();
		var size = this.size = cc.director.getWinSize();
        enemies = new EnemiesLayer();
        this.addChild(enemies);
		
        cc.director.resume();
		
		var car = this.car = new cc.Sprite(res.Car_temp_png);
        car.setAnchorPoint(cc.p(0.5,0.5));
		car.setPosition(cc.p(size.width/2 - 3, 150));
		this.addChild(car);
        
         var cleft = cc.MenuItemImage.create(
                res.Left_nope_png,
                res.Left_yeah_png,
                this.turnleft,
                this
            );
        cleft.setPosition(35, 40);
        
        var cright = cc.MenuItemImage.create(
                res.Right_nope_png,
                res.Right_yeah_png,
                this.turnright,
                this
            );
        cright.setPosition(size.width - 35, 40);
        

        var clr = cc.Menu.create(cleft, cright);
        clr.setPosition(0,0);
        this.addChild(clr);

        // if the ability exists
        if(cc.sys.capabilities.hasOwnProperty('keyboard'))
        {
            //add a keyboard event listener to statusLabel
            cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){

                if(keyCode == 37)
                {
                    event.getCurrentTarget().turnleft();
                }
                
                if(keyCode == 39)
                {
                   event.getCurrentTarget().turnright();
                }
            },
            onKeyReleased: function(keyCode, event){
            }
            
        }, this);
       }
	   
	   this.scheduleUpdate();
    },
    turnleft:function(sender)
    {
        if (this.goleft)
        {
            var sprite_action = cc.MoveBy(0.1, cc.p(-ONE_MOVE, 0));
            this.car.runAction(sprite_action);
            
            this.goright++;
            this.goleft--;
        }
    },
    turnright:function(sender)
    {
        if(this.goright)
        {
            var sprite_action = cc.MoveBy(0.1, cc.p(ONE_MOVE, 0));
            this.car.runAction(sprite_action);
            
            this.goleft++;
            this.goright--;
        }
    },
	update:function() {
		var carBoundingBox = this.car.getBoundingBox();
		var car2BoundingBox = enemies.car2.getBoundingBox();
		var car3BoundingBox = enemies.car3.getBoundingBox();
		var car4BoundingBox = enemies.car4.getBoundingBox();
		
		if(cc.rectIntersectsRect(carBoundingBox, car2BoundingBox) || cc.rectIntersectsRect(carBoundingBox, car3BoundingBox) ||
		cc.rectIntersectsRect(carBoundingBox, car4BoundingBox)) {
			cc.director.pause();
			this.addChild(new GameOverLayer());
			
		}
	}
});