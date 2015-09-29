var START_POS = 620;
var END_POS = 50;
var MOVE = 70;
var FIX_MOVE = 17;
var oc_streets = [];
var STREET_LINES = 5;
var MIN_DISTANCE = 100;
var temp_distance = 0;
var cars_on_lines = [][]; 

for(var i = 0; i < STREET_LINES; i++)
{
    cars_on_lines[i][0] = { 
                            car_pos: null,
                            car_id: null
                          };
}



var EnemiesLayer = cc.Layer.extend({
ctor:function () {
        this._super();
        this.init();     
    },
    init:function() {
        this._super();
        f_empty_oc_streets();
        
        var car2 = this.car2 = new cc.Sprite.create(get_random_car().res_car);
        this.car2.setPosition(0, -60);
        this.addChild(car2);
        
        var car3 = this.car3 = new cc.Sprite.create(get_random_car().res_car);
        this.car3.setPosition(0, -60);
        this.addChild(car3);
        
        var car4 = this.car4 = new cc.Sprite.create(get_random_car().res_car);
        this.car4.setPosition(0, -60);
        this.addChild(car4);
        
      
//        var car5 = this.car5 = new cc.Sprite.create(get_random_car().res_car);
//        this.car5.setPosition(0, -60);
//        this.addChild(car5);
//        
//        var car6 = this.car6 = new cc.Sprite.create(get_random_car().res_car);
//        this.car6.setPosition(0, -60);
//        this.addChild(car6);
//        
//        var car7 = this.car7 = new cc.Sprite.create(get_random_car().res_car);
//        this.car7.setPosition(0, -60);
//        this.addChild(car7);

		var size = this.size = cc.director.getWinSize();
        
        this.scheduleUpdate();
    },
    update:function(dt) 
    {	
        //Wrong logic, cars have go up or main car needs go up
        
       
        
        
		if( (this.car2.getPosition().y < -END_POS))
        {
            // REMOVE OLD CAR FROM THE CAR LINE LIST
            
            
            
            
            var LINE = getRandomInt(0, STREET_LINES);
            var ADDPLACEMENT = getRandomInt(50, 90);
            
            this.car2.setTexture(get_random_car().res_car);
            
            
            // IF CURRENT LINE IS NOT OCCUPATED THEN SET THE CAR
            if( !oc_streets[LINE].oc ) 
            {
                 f_set_oc_streets(LINE, true);
                
			     this.car2.setPosition(FIX_MOVE + (MOVE * LINE ), this.car2.getPosition().y + START_POS + ADDPLACEMENT);
                
                 // SAVE POS FOR COMPARING DISTANCES BETWEEN CARS
                 f_save_pos(i_line, this.car2.getPosition().y, "car2" );
            } 
            else
            {
                // JUST SET THE CAR TO NEXT FREE LINE
                
               var count_empty_streets = STREET_LINES;
            
               for(var i_line = 0; i_line < STREET_LINES; i_line++)
               {
                    if( !oc_streets[i_line].oc )
                    {
                         count_empty_streets--;
                         
                         f_set_oc_streets(LINE, true);
                        
			             this.car2.setPosition(FIX_MOVE + (MOVE * i_line ), this.car2.getPosition().y + START_POS + ADDPLACEMENT);
                          
                         // SAVE POS AND AN CAR_ID FOR COMPARING DISTANCES BETWEEN CARS
                         f_save_pos(i_line, this.car2.getPosition().y, "car2" );
                    }
                   else 
                   {
                        count_empty_streets--;
                   }
               } 
               // IF ALL LINES ARE OCCUPATED, GET A RANDOM OCCUPATED LINE AND CHECK THE DISTANCE
               if(!count_empty_streets)
               {
                   
                   
                    // CHECK THE DISTANCE WITH OTHERS ON THE SAME LINE
                   f_check_distance(LINE, this.car2.getPosition().y); 
                                
                   
                   
               }
            
            }
                
		}
        else
        {
            this.car2.setPosition(this.car2.getPosition().x, this.car2.getPosition().y - 3);
            
            f_update_pos(i_line, this.car2.getPosition().y, "car2" );
        }
        
        
		if(this.car3.getPosition().y < -END_POS) 
        {
            var LINE = getRandomInt(0, STREET_LINES);
            
            var ADDPLACEMENT = getRandomInt(0, 40);

            this.car3.setTexture(get_random_car().res_car);
            
            f_set_oc_streets(LINE);
            
			this.car3.setPosition(FIX_MOVE + (MOVE * LINE ), this.car3.getPosition().y + START_POS + ADDPLACEMENT);
		}
        else
        {
            this.car3.setPosition(this.car3.getPosition().x, this.car3.getPosition().y - 4);
        }
        
		if(this.car4.getPosition().y < -END_POS) 
        {
            var LINE = getRandomInt(0, STREET_LINES);
            var ADDPLACEMENT = getRandomInt(20, 60);
            
            this.car4.setTexture(get_random_car().res_car);
            
            f_set_oc_streets(LINE);
            
			this.car4.setPosition(FIX_MOVE + (MOVE * LINE), this.car4.getPosition().y + START_POS + ADDPLACEMENT);
		}
        else
        {
            this.car4.setPosition(this.car4.getPosition().x, this.car4.getPosition().y - 5);
        }
    }
})


// Generate unique IDs for use as pseudo-private/protected names.
function f_generate_id()
{
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};




function f_save_pos (line, car_y, id)
{
    var car_nbr = 0;
    var done = false;
    
    while ( !done )
    {
        car_nbr++;

        if(cars_on_lines[line][car_nbr].car_pos == null)
        {
            cars_on_lines[line][car_nbr].car_pos = car_y;
            cars_on_lines[line][car_nbr].car_id = id;

            cars_on_lines[line].push( { car_pos : null, car_id: null } );

            done = true;
        }
    }
}



function f_update_pos (line, car_y, id)
{
    var car_nbr = 0;
    var done = false;
    
     while ( !done )
    {
        car_nbr++;

        if (cars_on_lines[line][car_nbr].car_id == id)
        {
            cars_on_lines[line][car_nbr].car_pos = car_y;
            done = true;
        }
    }
}



function f_check_distance(line, car_y)
{
    if( (car_y   < 50 )
    {
        
    
    }
}



function f_set_oc_streets(LINE, b_val)
{
    oc_streets[LINE].field = LINE;
    oc_streets[LINE].oc = b_val;
}


function f_empty_oc_streets()
{
    for(var i = 0; i < STREET_LINES; i++)
    {
        oc_streets[i] = { 
                         field: i, 
                         oc: false
                        }
    }
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