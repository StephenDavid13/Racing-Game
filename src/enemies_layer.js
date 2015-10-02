var START_POS = 800;
var END_POS = 60;
var MOVE = 70;
var FIX_MOVE = 17;
var STREET_LINES = 5;
var MIN_DISTANCE = 120;
var SPEED_SLOW_DOWN = 1.5;

var CAR2_LINE = 0;
var CAR3_LINE = 1;
var CAR4_LINE = 2;
var CAR5_LINE = 3;

var NEW_CAR2 = true;
var NEW_CAR3 = true;
var NEW_CAR4 = true;
var NEW_CAR5 = true;

var CAR2_DISTANCE_ACHIEVED = false;
var CAR3_DISTANCE_ACHIEVED = false;
var CAR4_DISTANCE_ACHIEVED = false;
var CAR5_DISTANCE_ACHIEVED = false;

var CAR2_SPEED = false;
var CAR3_SPEED = false;
var CAR4_SPEED = false;
var CAR5_SPEED = false;

var EnemiesLayer = cc.Layer.extend({
    
    RANDOM_POS: cc.p(0,  START_POS + getRandomInt(0, 30)),
    
    available_lines : [],
    
    last_car: function () {
                
    },
    
    ctor:function () 
    {
        this._super();
        this.init();     
    },
    
    set_all_lines_empty: function()
    {
        for(var i = 0; i < STREET_LINES; i++)
        {
            this.available_lines[i] = { 
                                        line: i, 
                                        empty: true
                                      }
        }
    },
    
    line_free: function (carAX, carBX, carCX, carDX, carAY )
    {
        return (carAX != carBX) // IF THE CAR IS ALONE ON THE LINE
        &&     (carAX != carCX) 
        &&     (carAX != carDX) 
        && ((START_POS - carAY) > MIN_DISTANCE); // AND THE DISTANCES FROM START POINT IS FAR ENOUGH
    },
    
    distance_too_close: function(carAX, carAY, carBX, carBY, carCX, carCY, carDX, carDY)
    {
        var tooClose = false;
        
        tooClose = (  ((carAX == carBX)     // CHECK IF SAME LINE
            &&         (carAY >  carBY)     // CHECK IF CAR2 IS BEHIND ANOTHER CAR
            &&        ((carAY -  carBY) < MIN_DISTANCE) )   // CHECK THE DISTANCE, IF BELOW DISTANCE REDUCE SPEED

            ||        ((carAX == carCX)     // CHECK IF SAME LINE
            &&         (carAY >  carCY)     // CHECK IF CAR2 IS BEHIND ANOTHER CAR
            &&        ((carAY -  carCY) < MIN_DISTANCE) )  // CHECK THE DISTANCE, IF BELOW DISTANCE REDUCE SPEED

            ||        ((carAX == carDX)     // CHECK IF SAME LINE
            &&         (carAY >  carDY)     // CHECK IF CAR2 IS BEHIND ANOTHER CAR
            &&        ((carAY -  carDY) < MIN_DISTANCE) ) );  // CHECK THE DISTANCE, IF BELOW DISTANCE REDUCE SPEED
        
        return tooClose;
    },
    
    get_all_available_lines: function()
    {
        var collect_empty_lines = [];
        var j = 0;

        for(var i = 0; i < STREET_LINES; i++)
        {
          if (this.available_lines[i].empty)
          {
              collect_empty_lines[j] = i;
              j++
          }
        }
        return collect_empty_lines;
    },
    
    
    init:function() 
    {
        this._super();
        
        // SET ALL LINES EMPTY 
        this.set_all_lines_empty();
        
        var car2 = this.car2 = new cc.Sprite.create(get_random_car().res_car);
        this.car2.setPosition( this.RANDOM_POS );
        this.addChild(car2);
        
        var car3 = this.car3 = new cc.Sprite.create(get_random_car().res_car);
        this.car3.setPosition( this.RANDOM_POS );
        this.addChild(car3);
        
        var car4 = this.car4 = new cc.Sprite.create(get_random_car().res_car);
        this.car4.setPosition( this.RANDOM_POS );
        this.addChild(car4);
        
        var car5 = this.car5 = new cc.Sprite.create(get_random_car().res_car);
        this.car5.setPosition( this.RANDOM_POS );
        this.addChild(car5);

		var size = this.size = cc.director.getWinSize();
        
        this.scheduleUpdate();
    },
    update:function(dt) 
    {	
//-------------------------------------------------------------------------------------------------------------------------------
        
        // IF THE CAR IS OUT OF THE DISPLAY SET A NEW CAR 
		if( NEW_CAR2 )
        {
             CAR2_DISTANCE_ACHIEVED = false;
            
             // GET A RANDOM CAR TEXTURE
             this.car2.setTexture(get_random_car().res_car);
            
             // GET A RANDOM LINE  --> UP TO 4 CARS OTHERS, MODIFING AVAILABLE LINES, BECAUSE NOW THERE IS ALWAYS A LINE AVAIL.
             CAR2_LINE = this.get_all_available_lines()[ getRandomInt( 0, this.get_all_available_lines().length ) ]; 
            
             // GET A RANDOM ADDITIONAL PLACE
             var ADDPLACEMENT = getRandomInt(0, 5);
             
             // SET THE CAR
             this.car2.setPosition(FIX_MOVE + (MOVE * CAR2_LINE ), START_POS + ADDPLACEMENT);
             
             // SET THE LINE TO NOT AVAILABLE AND SET WE DONT NEED A NEW CAR OF THIS TYPE
             this.available_lines[CAR2_LINE].empty = false; NEW_CAR2 = false;
		}
        else 
        { 
            // IF MOVING
            if( this.car2.getPosition().y > -END_POS )
            {  
                // IF THERE IS A CAR IN FRONT THEN SLOW DOWN 
                if ( (this.distance_too_close(
                                          this.car2.getPosition().x, this.car2.getPosition().y, 
                                          this.car3.getPosition().x, this.car3.getPosition().y,
                                          this.car4.getPosition().x, this.car4.getPosition().y,
                                          this.car5.getPosition().x, this.car5.getPosition().y ))  )
                {
                    cc.log("SLOW DOWN 2");
                    this.car2.setPosition(this.car2.getPosition().x, this.car2.getPosition().y - SPEED_SLOW_DOWN);
                    CAR2_SPEED = true;
                }
                else  // ELSE KEEP THE SPEED
                {      
                    // IF THIS CAR IS FAR ENOUGH AND THIS CAR IS THE ONLY ONE ON HIS LINE, SET THE LINE BACK TO EMPTY
                    if ( !CAR2_DISTANCE_ACHIEVED && this.line_free(this.car2.getPosition().x, this.car3.getPosition().x, 
                                                                   this.car4.getPosition().x, this.car5.getPosition().x, this.car2.getPosition().y ))
                    {
                        this.available_lines[CAR2_LINE].empty = true; 
                        CAR2_DISTANCE_ACHIEVED = true;
                    }
                }
                
                if(CAR2_SPEED) {
                    this.car2.setPosition(this.car2.getPosition().x, this.car2.getPosition().y - SPEED_SLOW_DOWN);
                }
                else {
                        this.car2.setPosition(this.car2.getPosition().x, this.car2.getPosition().y - 3.4);
                }
            }
            else // ELSE CAR IS OUT OF THE DISPLAY REMEMBER TO CREATE A NEW CAR
            {   
                NEW_CAR2 = true;
                CAR2_SPEED = false;
            }
        }
    
    
//-------------------------------------------------------------------------------------------------------------------------------
 
        // IF THE CAR IS OUT OF THE DISPLAY SET A NEW CAR 
		if( NEW_CAR3 )
        {
             CAR3_DISTANCE_ACHIEVED = false;
            
             // GET A RANDOM CAR TEXTURE
             this.car3.setTexture(get_random_car().res_car);
            
             // GET A RANDOM LINE  --> UP TO 4 CARS OTHERS, MODIFING AVAILABLE LINES, BECAUSE NOW THERE IS ALWAYS A LINE AVAIL.
             CAR3_LINE = this.get_all_available_lines()[ getRandomInt( 0, this.get_all_available_lines().length ) ]; 
            
             // GET A RANDOM ADDITIONAL PLACE
             var ADDPLACEMENT = getRandomInt(0, 5);
             
             // SET THE CAR
            
             this.car3.setPosition(FIX_MOVE + (MOVE * CAR3_LINE ), START_POS + ADDPLACEMENT);
             
             // SET THE LINE TO NOT AVAILABLE AND SET WE DONT NEED A NEW CAR OF THIS TYPE
             this.available_lines[CAR3_LINE].empty = false; NEW_CAR3 = false;
		}
        else 
        { 
            // IF MOVING
            if( this.car3.getPosition().y > -END_POS )
            {  
                // IF THERE IS A CAR IN FRONT THEN SLOW DOWN 
                if ( (this.distance_too_close(
                                         this.car3.getPosition().x, this.car3.getPosition().y, 
                                         this.car2.getPosition().x, this.car2.getPosition().y,
                                         this.car4.getPosition().x, this.car4.getPosition().y,
                                         this.car5.getPosition().x, this.car5.getPosition().y)) )
                {
                    cc.log("SLOW DOWN 3");
                    this.car3.setPosition(this.car3.getPosition().x, this.car3.getPosition().y - SPEED_SLOW_DOWN);
                    CAR3_SPEED = true;
                }
                else  // ELSE KEEP SPEED
                {                   
                    // IF THIS CAR IS FAR ENOUGH AND THIS CAR IS THE ONLY ONE ON HIS LINE, SET THE LINE BACK TO EMPTY
                    if ( !CAR3_DISTANCE_ACHIEVED && this.line_free(this.car3.getPosition().x, this.car2.getPosition().x, 
                                                                   this.car4.getPosition().x, this.car5.getPosition().x, this.car3.getPosition().y ))
                    {
                        this.available_lines[CAR3_LINE].empty = true; 
                        CAR3_DISTANCE_ACHIEVED = true;
                    }
                }
                
                if(CAR3_SPEED) {
                    this.car3.setPosition(this.car3.getPosition().x, this.car3.getPosition().y - SPEED_SLOW_DOWN);
                }
                else {
                        this.car3.setPosition(this.car3.getPosition().x, this.car3.getPosition().y - 3.7);
                }
            }
            else // ELSE CAR IS OUT OF THE DISPLAY REMEMBER TO CREATE A NEW CAR
            {
                 NEW_CAR3 = true;  
                CAR3_SPEED = false;
            }
        }
        
//------------------------------------------------------------------------------------------------------------------------------

        // IF THE CAR IS OUT OF THE DISPLAY SET A NEW CAR 
		if( NEW_CAR4 )
        {
             CAR4_DISTANCE_ACHIEVED = false;
            
             // GET A RANDOM CAR TEXTURE
             this.car4.setTexture(get_random_car().res_car);
            
             // GET A RANDOM LINE  --> UP TO 4 CARS OTHERS, MODIFING AVAILABLE LINES, BECAUSE NOW THERE IS ALWAYS A LINE AVAIL.
             CAR4_LINE = this.get_all_available_lines()[ getRandomInt( 0, this.get_all_available_lines().length ) ]; 
            
             // GET A RANDOM ADDITIONAL PLACE
             var ADDPLACEMENT = getRandomInt(0, 5);
             
             // SET THE CAR
             this.car4.setPosition(FIX_MOVE + (MOVE * CAR4_LINE ), START_POS + ADDPLACEMENT);
             
             // SET THE LINE TO NOT AVAILABLE AND SET WE DONT NEED A NEW CAR OF THIS TYPE
             this.available_lines[CAR4_LINE].empty = false; NEW_CAR4 = false;
		}
        else 
        { 
            // IF MOVING
            if( this.car4.getPosition().y > -END_POS )
            {  
                // IF THERE IS A CAR IN FRONT THEN SLOW DOWN 
                if ( (this.distance_too_close(
                                         this.car4.getPosition().x, this.car4.getPosition().y, 
                                         this.car3.getPosition().x, this.car3.getPosition().y,
                                         this.car2.getPosition().x, this.car2.getPosition().y,
                                         this.car5.getPosition().x, this.car5.getPosition().y) ) )
                {
                    cc.log("SLOW DOWN 4");
                    this.car4.setPosition(this.car4.getPosition().x, this.car4.getPosition().y - SPEED_SLOW_DOWN);
                    CAR4_SPEED = true;
                }
                else  // ELSE KEEP SPEED
                {            
                    // IF THIS CAR IS FAR ENOUGH AND THIS CAR IS THE ONLY ONE ON HIS LINE, SET THE LINE BACK TO EMPTY
                    if ( !CAR4_DISTANCE_ACHIEVED && this.line_free(this.car4.getPosition().x, this.car2.getPosition().x, 
                                                                   this.car3.getPosition().x, this.car5.getPosition().x, this.car4.getPosition().y ))
                    {
                        this.available_lines[CAR4_LINE].empty = true; 
                        CAR4_DISTANCE_ACHIEVED = true;
                    }
                }
                if(CAR4_SPEED) {
                    this.car4.setPosition(this.car4.getPosition().x, this.car4.getPosition().y - SPEED_SLOW_DOWN);
                }
                else {
                        this.car4.setPosition(this.car4.getPosition().x, this.car4.getPosition().y - 4.1);
                }
            }
            else // ELSE CAR IS OUT OF THE DISPLAY REMEMBER TO CREATE A NEW CAR
            {
                 NEW_CAR4 = true;  
                CAR4_SPEED = false;
            }
        }
        
//--------------------------------------------------------------------------------------------------------------

        // IF THE CAR IS OUT OF THE DISPLAY SET A NEW CAR 
		if( NEW_CAR5 )
        {
             CAR5_DISTANCE_ACHIEVED = false;
            
             // GET A RANDOM CAR TEXTURE
             this.car5.setTexture(get_random_car().res_car);
            
             // GET A RANDOM LINE  --> UP TO 4 CARS OTHERS, MODIFING AVAILABLE LINES, BECAUSE NOW THERE IS ALWAYS A LINE AVAIL.
             CAR5_LINE = this.get_all_available_lines()[ getRandomInt( 0, this.get_all_available_lines().length ) ]; 
            
             // GET A RANDOM ADDITIONAL PLACE
             var ADDPLACEMENT = getRandomInt(0, 5);
             
             // SET THE CAR
             this.car5.setPosition(FIX_MOVE + (MOVE * CAR5_LINE ), START_POS + ADDPLACEMENT);
             
             // SET THE LINE TO NOT AVAILABLE AND SET WE DONT NEED A NEW CAR OF THIS TYPE
             this.available_lines[CAR5_LINE].empty = false; NEW_CAR5 = false;
		}
        else 
        { 
            // IF MOVING
            if( this.car5.getPosition().y > -END_POS )
            {  
                // IF THERE IS A CAR IN FRONT THEN SLOW DOWN 
                if ( (this.distance_too_close(
                                         
                                         this.car5.getPosition().x, this.car5.getPosition().y, 
                                         this.car4.getPosition().x, this.car4.getPosition().y, 
                                         this.car3.getPosition().x, this.car3.getPosition().y,
                                         this.car2.getPosition().x, this.car2.getPosition().y) ) )
                {
                    cc.log("SLOW DOWN 5");
                    this.car5.setPosition(this.car5.getPosition().x, this.car5.getPosition().y - SPEED_SLOW_DOWN);
                    CAR5_SPEED = true;
                }
                else  // ELSE KEEP SPEED
                {            
                    // IF THIS CAR IS FAR ENOUGH AND THIS CAR IS THE ONLY ONE ON HIS LINE, SET THE LINE BACK TO EMPTY
                    if ( !CAR5_DISTANCE_ACHIEVED && this.line_free(this.car5.getPosition().x, this.car4.getPosition().x, 
                                                                   this.car2.getPosition().x, this.car3.getPosition().x, this.car5.getPosition().y ))
                    {
                        this.available_lines[CAR5_LINE].empty = true; 
                        CAR5_DISTANCE_ACHIEVED = true;
                    }
                }
                if(CAR5_SPEED) {
                    this.car5.setPosition(this.car5.getPosition().x, this.car5.getPosition().y - SPEED_SLOW_DOWN);
                }
                else {
                        this.car5.setPosition(this.car5.getPosition().x, this.car5.getPosition().y - 4.3);
                }
            }
            else // ELSE CAR IS OUT OF THE DISPLAY REMEMBER TO CREATE A NEW CAR
            {
                 NEW_CAR5 = true;  
                 CAR5_SPEED = false;
            }
        }
        
    }
  
    
}); 
        


// Generate unique IDs for use as pseudo-private/protected names.
function f_generate_id()
{
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};


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