
//function check_available_lines()
//{
//   for(var i_line = 0; i_line < STREET_LINES; i_line++)    
//   {
//       if(!oc_streets[i_line].oc)
//       {
//         return true;
//       }
//   }
//   return false;
//}





//function f_romove_car_from_list(id)
//{
//   cc.log("REMOVE OLD CAR");
//
//   for( var i_line = 0; i_line < cars_on_lines.length; i_line++ )
//   {
//        for( var i_car = 0; i_car < cars_on_lines[i_line].length; i_car++ )
//        {
////             cc.log("22removing....." + i_line + " " + i_car);
////             cc.log("22removing....." + cars_on_lines[0][i_car].car_id + " == " + id );
//                
//            if( cars_on_lines[i_line][i_car].car_id == id )
//            {
//                cc.log("REMOVED");
//                
////                 cc.log("removing.....");
//                
//                cars_on_lines[i_line].splice(i_car, 1);
//                
//                //INIT LAST FIELD
//                if(cars_on_lines[i_line].length == 0)
//                {
//                    cars_on_lines[i_line][0] = new_obj_car_info;
//                    
////                    cc.log("set new car" + cars_on_lines[i_line][0]);
//                    // NO CAR ON THAT LINE
//                    f_set_oc_streets(i_line, false);
//                    
////                    cc.log("removed.....");
//                }
//                else
//                {
////                    cc.log("set new car, else");
//                    cars_on_lines[i_line][ cars_on_lines[i_line].length ] = new_obj_car_info;
//                }
//            }
//        }
//   }
//}
//
//
//var tline = 0;
//var tcar_nbr = 0;

//
//function f_save_pos (line, car_y, id)
//{
//    var i_car = 0;
//    var done = false;
//    
//    while ( !done )
//    {
////        cc.log(cars_on_lines[line][i_car].car_pos);
//        
//        if(cars_on_lines[line][i_car].car_pos == null)
//        {
//            cars_on_lines[line][i_car].car_pos = car_y;
//            cars_on_lines[line][i_car].car_id = id;
//            
//            cars_on_lines[line][i_car++] = {
//                                                car_pos: null,
//                                                car_id: null
//                                            }
//            //new f_empty_car();
//            
//            done = true;
//        }
//        i_car++;
//    }
//    
//    //  
////    cc.log("Saved : " + cars_on_lines[line][car_nbr].car_id + " == " + id );
//    tline = line;
//    tcar_nbr = i_car;
//            
//}



//function f_update_pos (car_y, id)
//{
//    for(var i_line = 0; i_line < STREET_LINES; i_line++)    
//    {
//        for(var car_nbr = 0; car_nbr < cars_on_lines[i_line].length; car_nbr++)
//        {
//            if (cars_on_lines[i_line][car_nbr].car_id == id)
//            {
//                cars_on_lines[i_line][car_nbr].car_pos = car_y;
//                return;
//            }
//        }
//    }
//}


// CHECK IF THE DISTANCE TO THE NEXT CAR ON THE SAME LINE IS CLEAR TO GO
//function f_check_distance( line, car_y )
//{
//   var NO_CAR = true;
//    
//   for( var i_car = 0; i_car < cars_on_lines[line].length; i_car++ )
//   {
//       if( ( cars_on_lines[line][i_car].car_pos != null ) && ( START_POS - cars_on_lines[line][i_car].car_pos) > 100 )
//       {
//          NO_CAR = false;
//       }                 
//   }
//   return NO_CAR;
//}


//
//function f_set_oc_streets(line, b_val)
//{
//    oc_streets[line].field = line;
//    oc_streets[line].oc = b_val;
//}



//function f_empty_oc_streets()
//{
//    for(var i = 0; i < STREET_LINES; i++)
//    {
//        oc_streets[i] = { 
//                         field: i, 
//                         oc: false
//                        }
//    }
//}

//        for(var k = 0; k < STREET_LINES; k++)
//        {
//            this.cars_on_lines[k] = [];
//            this.cars_on_lines[k][0] =  new f_empty_car() ;
//        }
        
//        cc.log( this.cars_on_lines )



//function f_empty_car()
//{
//    return  { 
//                  car_pos: null,
//                  car_id: null
//            };
//}

  //                if(this.car2.getPosition().x == this.car3.getPosition().x || this.car3.getPosition().x == this.car4.getPosition().x) {
//                    if( (START_POS - this.car2.getPosition().y) < 200  || (START_POS - this.car3.getPosition().y) < 200 || (START_POS - this.car4.getPosition().y) < 200 )
//                    {
//                        this.available_lines[CAR3_LINE].empty = true;    
//                    }
//                }