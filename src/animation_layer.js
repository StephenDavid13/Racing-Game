var MAX_MOVES = 2;
var ONE_MOVE = 70;

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

		var enemies =new EnemiesLayer();
//
        this.addChild(enemies);
        
        
        this.car = new cc.Sprite.create(res.Car_temp_png);
        this.car.setAnchorPoint(cc.p(0.5,0.5));
		this.car.setPosition(cc.p(size.width/2 - 3, 150));
		this.addChild(this.car);
        
         var cleft = cc.MenuItemImage.create(
                res.Left_png,
                res.Rigth_png,
                this.turnleft,
                this
            );
        cleft.setPosition(86, 40);
        
        var cright = cc.MenuItemImage.create(
                res.Rigth_png,
                res.Left_png,
                this.turnright,
                this
            );
        cright.setPosition(228, 40);
        

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
        
                cc.log("key was pressed:  " + keyCode.toString());
            },
            onKeyReleased: function(keyCode, event){
            }
        }, this);
       }  
    },
    turnleft:function(sender)
    {
        if (this.goleft)
        {
            var sprite_action = cc.MoveBy.create(0.35, cc.p(-ONE_MOVE, 0));
            this.car.runAction(sprite_action);
            
            this.goright++;
            this.goleft--;
        }
    },
    turnright:function(sender)
    {
        if(this.goright)
        {
            var sprite_action = cc.MoveBy.create(0.35, cc.p(ONE_MOVE, 0));
            this.car.runAction(sprite_action);
            
            this.goleft++;
            this.goright--;
        }
    }
});