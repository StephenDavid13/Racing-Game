var START_POS = 620;
var END_POS = 50;

var EnemiesLayer = cc.Layer.extend({
ctor:function () {
        this._super();
        this.init();     
    },
    init:function() {
        this._super();
        
        var car2 = this.car2 = new cc.Sprite(res.Car_temp2_png);
        this.addChild(car2);
        
        var car3 = this.car3 = new cc.Sprite(res.Car_temp3_png);
        this.addChild(car3);
        
        var car4 = this.car4 = new cc.Sprite(res.Car_temp4_png);
        this.addChild(car4);
        
        
		var size = this.size = cc.director.getWinSize();

        this.scheduleUpdate();
    },
    update:function(dt) 
    {	
        //Wrong logic, cars has go up or main car needs go up
        
		if(this.car2.getPosition().y < -END_POS) {
			this.car2.setPosition(this.size.width/2 - 3, this.car2.getPosition().y+START_POS);
		}
        else
        {
            this.car2.setPosition(this.car2.getPosition().x, this.car2.getPosition().y-1);
        }
        
		if(this.car3.getPosition().y < -END_POS) {
			this.car3.setPosition(this.size.width/2 - 3 - 70, this.car3.getPosition().y+START_POS);
		}
        else
        {
            this.car3.setPosition(this.car3.getPosition().x, this.car3.getPosition().y-1.2);
        }
        
		if(this.car4.getPosition().y < -END_POS) {
			this.car4.setPosition(this.size.width/2 - 3 + 70, this.car4.getPosition().y+START_POS);
		}
        else
        {
            this.car4.setPosition(this.car4.getPosition().x, this.car4.getPosition().y-1.3);
        }
    }
})