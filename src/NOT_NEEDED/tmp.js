// IF THE CAR IS OUT OF THE DISPLAY SET A NEW CAR 
		if( (this.car2.getPosition().y < -END_POS) )
        {
            
            this.available_lines[line_car2].empty = true;
            
            // REMOVE OLD CAR FROM THE CAR LINE LIST
            this.remove_car("car2"); 
            // GET A RANDOM ADDITIONAL DISTANCE
            var ADDPLACEMENT = getRandomInt(50, 90);
            // GET A RANDOM CAR TEXTURE
            this.car2.setTexture(get_random_car().res_car);
            
             cc.log("CREATE NEW CAR");
            
            var done = false;
            
            while(!done)
            {
                // GET A RANDOM LINE
                var LINE = line_car2 = getRandomInt(0, STREET_LINES);

                // IF CURRENT LINE IS AVAILABLE THEN SET THE CAR
                if( this.available_lines[LINE].empty ) 
                {    
                     cc.log("LINE IS AVAILABLE SET THE CAR ON : " + LINE);

                     this.available_lines[LINE].empty = false;

                     this.car2.setPosition(FIX_MOVE + (MOVE * LINE ), this.car2.getPosition().y + START_POS + ADDPLACEMENT);

                     // NEW CAR, SAVE LINE POS, CAR_ID
                     this.save_car(LINE, this.car2.getPosition().y, "car2");
                    
                     done = true;
                }
            }
            
//            else
//            {
//                cc.log("THE CURRENT LINE  IS NOT AVAILABLE");
//                // JUST SET THE CAR TO THE NEXT FREE LINE
//                if ( this.check_available_lines() )
//                {
//                    cc.log("LINES AVAILABLE");
//                    
//                    LINE = line_car2 = getRandomInt(0, this.get_all_available_lines.length); 
//
//                    if( this.available_lines[LINE].empty )
//                    {
//                         this.available_lines[LINE].empty = false;
//
//                         this.car2.setPosition(FIX_MOVE + (MOVE * LINE ), this.car2.getPosition().y + START_POS + ADDPLACEMENT);
//
//                         // NEW CAR, SAVE LINE POS, CAR_ID
//                         this.save_car(LINE, this.car2.getPosition().y, "car2" );
//                    }
//                 }
//                // IF THERE ARE NO LINES AVAILABLE, JUST CHECK THE DISTANCE
//                else 
//                {
//                   cc.log("CHECK THE DISTANCE WITH OTHERS ON THE SAME LINE");
//                    // CHECK THE DISTANCE WITH OTHERS ON THE SAME LINE
//                   if ( this.no_car_in_front(LINE, "car2" ))
//                   {
//                      this.car2.setPosition(FIX_MOVE + (MOVE * LINE ), this.car2.getPosition().y + START_POS + ADDPLACEMENT);
//
//                      // SAVE POS FOR COMPARING DISTANCES BETWEEN CARS
//                      this.save_car(i_line, this.car2.getPosition().y, "car2" );
//                   }
//                   else
//                   {
//                     cc.log("DO NOT DO ANYTHING, JUST WAIT FOR THE NEXT ROUND");
//                   }
//                }
//            }
		}
        else 
        {
//            if ( this.no_car_in_front( line_car2, "car2" ) )
//            {
                this.car2.setPosition(this.car2.getPosition().x, this.car2.getPosition().y - 3);

                this.update_pos(this.car2.getPosition().y, "car2" );
            
            
//            }
//            else
//            {
//                cc.log("A CAR IN FRONT");
//               // this.car2.setPosition(this.car2.getPosition().x, this.car2.getPosition().y - 1);
//            //    this.update_pos(this.car2.getPosition().y, "car2" );
//                
//            }
        }

































//    
//    save_car: function (line, car_y, car_id ) 
//    {
//        var i_car = 0;
//        var done = false;
//    
//        while ( !done )
//        {
//            if(this.cars_on_lines[line][i_car].car_pos == null)
//            {
//                this.cars_on_lines[line][i_car].car_pos = car_y;
//                this.cars_on_lines[line][i_car].car_id = car_id;
//                
//                i_car++;
//                cc.log("SAVED")
//                
//                this.cars_on_lines[line][i_car] = new f_empty_car();
//
//                done = true;
//            }
//            i_car++;
//        }
//    },
//    
//    
//    no_car_in_front: function( line, car_id )
//    {
//       for( var i_car = 0; i_car < (this.cars_on_lines[line].length); i_car++ )
//       {
//           
//           if(this.cars_on_lines[line][i_car].car_id == car_id) 
//           {
//               var current_car_pos = this.cars_on_lines[line][i_car].car_pos;
//               
//               for( var k_car = 0; k_car < this.cars_on_lines[line].length; k_car++ )
//               {
//                   if( ( this.cars_on_lines[line][k_car].car_pos != null ) 
//                         && ( this.cars_on_lines[line][k_car].car_id != car_id )
//                         && (( current_car_pos - this.cars_on_lines[line][i_car].car_pos) < MIN_DISTANCE ) )
//                   {
//                        cc.log("ARE U GOING IN? ");
//                        return false;
//                   }
//               }
//           
//           }
//           
//       }
//       return true;
//    },
//    
//    
//    update_pos:function(car_y, car_id) 
//    {
//        for(var i_line = 0; i_line < STREET_LINES; i_line++)    
//        {
//            for(var i_car = 0; i_car < this.cars_on_lines[i_line].length; i_car++)
//            {
//                if (this.cars_on_lines[i_line][i_car].car_id == car_id)
//                {
//                    this.cars_on_lines[i_line][i_car].car_pos = car_y;
//                   
//                    return;
//                }
//            }
//        }
//    },
//    
//    
//    remove_car:function(car_id) 
//    {
//       for( var i_line = 0; i_line < this.cars_on_lines.length; i_line++ )
//       {
//            for( var i_car = 0; i_car < this.cars_on_lines[i_line].length; i_car++ )
//            {  
//                if( this.cars_on_lines[i_line][i_car].car_id == car_id)
//                {
//                    cc.log("REMOVED OLD CAR");
//                    
//                    cc.log(this.cars_on_lines)
//                    
//                    this.cars_on_lines[i_line].splice(i_car, 1);
//                    
//                    cc.log(this.cars_on_lines)
//                }
//            }
//       }
//    },