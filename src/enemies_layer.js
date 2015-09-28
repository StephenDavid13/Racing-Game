var START_POS = 620;
var END_POS = 50;
var MOVE = 70;
var FIX_MOVE = 17;
var oc_streets = {
                    one : false,
                    two : false,
                    three: false,
                    four: false,
                    five: false,
                 };


var EnemiesLayer = cc.Layer.extend({
ctor:function () {
        this._super();
        this.init();     
    },
    init:function() {
        this._super();
        
        var car2 = this.car2 = new cc.Sprite.create(get_random_car().res_car);
        this.addChild(car2);
        
        var car3 = this.car3 = new cc.Sprite.create(get_random_car().res_car);
        this.addChild(car3);
        
        var car4 = this.car4 = new cc.Sprite.create(get_random_car().res_car);
        this.addChild(car4);
        
		var size = this.size = cc.director.getWinSize();
        
        this.scheduleUpdate();
    },
    update:function(dt) 
    {	
        //Wrong logic, cars have go up or main car needs go up
		if(this.car2.getPosition().y < -END_POS) 
        {
            var TIMES = getRandomInt(0, 5);
            
            this.car2.setTexture(get_random_car().res_car);
			this.car2.setPosition(FIX_MOVE + (MOVE * TIMES ), this.car2.getPosition().y + START_POS);
		}
        else
        {
            this.car2.setPosition(this.car2.getPosition().x, this.car2.getPosition().y - 3);
        }
        
		if(this.car3.getPosition().y < -END_POS) 
        {
            var TIMES = getRandomInt(0, 5);
            this.car3.setTexture(get_random_car().res_car);
			this.car3.setPosition(FIX_MOVE + (MOVE * TIMES ), this.car3.getPosition().y + START_POS);
		}
        else
        {
            this.car3.setPosition(this.car3.getPosition().x, this.car3.getPosition().y - 4);
        }
        
		if(this.car4.getPosition().y < -END_POS) 
        {
            var TIMES = getRandomInt(0, 5);
            this.car4.setTexture(get_random_car().res_car);
			this.car4.setPosition(FIX_MOVE + (MOVE * TIMES), this.car4.getPosition().y + START_POS);
		}
        else
        {
            this.car4.setPosition(this.car4.getPosition().x, this.car4.getPosition().y - 5);
        }
    }
})


function check_distance()
{
    

}



function get_cars() 
{
    return {
                car : [
                       {
                            icar: {   car_name : "truck",
                                      res_car : res.Car_temp2_png,
                                      speed: 1
                            },
                       },{
                            icar: {
                                      car_name: "ncar",
                                      res_car : res.Car_temp3_png,
                                      speed: 1.2
                            },
                       },{
                            icar: {
                                      car_name: "bike",
                                      res_car : res.Car_temp4_png,
                                      speed: 1.3
                            }
                       },{
                            icar: {
                                      car_name: "temp",
                                      res_car : res.CloseNormal_png,
                                      speed: 1.3
                            }
                       }
                     ]        
    };
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max-min)) +min;
}


function get_random_car() 
{
    var random_int = getRandomInt(0,3);
    var random_car = get_cars();    
    
    return random_car.car[random_int].icar;
}