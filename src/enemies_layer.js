var START_POS = 620;
var END_POS = 50;
var car_num;
var actualDuration2 = Math.floor(Math.random() * 7) + 2; 
var actualDuration3 = Math.floor(Math.random() * 7) + 4; 
var actualDuration4 = Math.floor(Math.random() * 7) + 3; 

var carPositionx2;
var actualPositionx2 = 0;

var carPositionx3;
var actualPositionx3 = 0;

var carPositionx4;
var actualPositionx4 = 0;

var EnemiesLayer = cc.Layer.extend({
	ctor:function () {
        this._super();
        this.init();     
    },
    init:function() {
        this._super();
        
        var car2 = this.car2 = new cc.Sprite(res.Car_temp2_png);
		car2.setPosition(0, -100);
        this.addChild(car2);
        
        var car3 = this.car3 = new cc.Sprite(res.Car_temp3_png);
		car3.setPosition(70, -100);
        this.addChild(car3);

		var car4 = this.car4 = new cc.Sprite(res.Car_temp4_png);
		car4.setPosition(140, -100);
        this.addChild(car4);  
        
		var size = this.size = cc.director.getWinSize();

        this.scheduleUpdate();
    },
    update:function(dt) 
    {	
		carPositionx2 = Math.floor(Math.random() * 3) * 70;
		carPositionx2 *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
		actualPositionx2 = this.size.width/2 - 3 + carPositionx2;
		
		carPositionx3 = Math.floor(Math.random() * 3) * 70;
		carPositionx3 *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
		actualPositionx3 = this.size.width/2 - 3 + carPositionx3;
		
		
		carPositionx4 = Math.floor(Math.random() * 3) * 70;
		carPositionx4 *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
		actualPositionx4 = this.size.width/2 - 3 + carPositionx4;
		

		//CAR TEMP 2
		if(this.car2.getPosition().y < -END_POS) {
			if(actualPositionx2 != this.car3.getPosition().x && actualPositionx2 != this.car4.getPosition().x) {
				
				this.car2.setPosition(actualPositionx2, this.car2.getPosition().y+START_POS);
				actualDuration2 = Math.floor(Math.random() * 7) + 2; 
			}
			else {
				this.car2.setPosition(actualPositionx2, -100);
			}
			
			cc.log("CAR 2! " + actualPositionx2);
		}
		else
		{
			this.car2.setPosition(this.car2.getPosition().x, this.car2.getPosition().y-actualDuration2);
		}

		//CAR TEMP 3
		if(this.car3.getPosition().y < -END_POS) {
			if(actualPositionx3 != this.car2.getPosition().x && actualPositionx3 != this.car4.getPosition().x) {
				
				this.car3.setPosition(actualPositionx3, this.car3.getPosition().y+START_POS);
				actualDuration3 = Math.floor(Math.random() * 7) + 4;
			}
			else {
				this.car3.setPosition(actualPositionx3, -100);
			}
			cc.log("CAR 3! " + actualPositionx3);
		}
		else
		{
			this.car3.setPosition(this.car3.getPosition().x, this.car3.getPosition().y-actualDuration3);
		}
		
		//CAR TEMP 4
		if(this.car4.getPosition().y < -END_POS) {
			if(actualPositionx4 != this.car2.getPosition().x && actualPositionx4 != this.car3.getPosition().x) {
				
				this.car4.setPosition(actualPositionx4, this.car4.getPosition().y+START_POS);
				actualDuration4 = Math.floor(Math.random() * 7) + 2; 
			}
			else {
				this.car4.setPosition(actualPositionx4, -100);
			}
		cc.log("CAR 4! " + actualPositionx4);			
		}
		else
		{
			this.car4.setPosition(this.car4.getPosition().x, this.car4.getPosition().y-actualDuration4);
		}
		
    }
})