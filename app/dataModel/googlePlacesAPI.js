var path = require('path');
const https = require('https');

// Geocode an address.
module.exports = {

  getPlaces: function(type, callback){
    //var key = 'AIzaSyBV6zeRCH8WJ3nou-uiwYToG3Rnlsy7oRU';
    //var key = 'AIzaSyC3NLfEx9mW-CMBymzLAjrxJByQzzxN1mg'; 
    //var key = 'AIzaSyArIJaPtk5P57N5Na6ZKym-bvRnp0IyaYg';
    var key = 'AIzaSyAloPXLxrDoF0WWPbaZykZ8BeRvLHokAWc';
    //var key = 'AIzaSyA8PtE7o-EZgfVOoABhitN6yV10jr-UM5A'; 
    
    var searchquery = 'kronoberg'; //not åäö --> aao as Vaxjo
    //var type = 'bakery|restaurant|cafe'
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=" + key + "&query="+searchquery+ "&type="+type;

    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        
      //var placeArr = generatePlaceArr(data);
      //var message = createMess(placeArr);

       generatePlaceArr(data, function(arr) {
          createMess(arr, function(mess) {
            return callback(mess)
          });
        });
        
        //return callback(message);
        
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};

function generatePlaceArr(data, callback){
  var placeArr = [];
  var parsed = JSON.parse(data);
  var len = parsed['results'].length;
  var counter = 0; //init
  var flagFirst = 0;

  //get 7 google place items. Place in array.
  for(var i=0; i<len; i++){
      var name = parsed['results'][i].name;
      var type = "Categories: ";
      var address = parsed['results'][i].formatted_address;
      var photo = "photo"; //getPlacePhoto();
      var lat = parsed['results'][i].geometry.location.lat;
      var lng = parsed['results'][i].geometry.location.lng;
      var ref ="ref";
      
      if(parsed['results'][i].photos){
        ref = parsed['results'][i].photos[0].photo_reference;
      }else
        ref="(No place category defined)"
        console.log("NO PHOTO");
        
      if(parsed['results'][i].types){
        //type = parsed['results'][i].types[0];
        
        var typesArr = parsed['results'][i].types;
        var typesLen = typesArr.length;
        
        for(var k=0; k<typesLen; k++){
          type += typesArr[k]+", ";
        }
        type = type.substring(0, type.length - 2); //remove last ', '
        

      }else
        type="(No category listed for this place)"
        //console.log("NO TYPE");

      //placeArr[counter] = [name, typesTxt, address, photo, lat, lng];
      placeArr[i] = [name, type, address, photo, lat, lng]; 

    }
    return callback(placeArr);
}
    /*try{
      var name = parsed['results'][i].name;
      var type = parsed['results'][i].types;
      var address = parsed['results'][i].formatted_address;
      var photo_ref = parsed['results'][i].photos[0].photo_reference;
      var photo = "photo"; //getPlacePhoto();
      var lat = parsed['results'][i].geometry.location.lat;
      var lng = parsed['results'][i].geometry.location.lng;

      if( (address != 'undefined') && (name != 'undefined') 
      && (photo_ref != 'undefined') && (counter < 4 ) ){
          if(flagFirst==0){
            counter=0;
            flagFirst=1;
          }
          else{
            counter=counter+1;
          }
          placeArr[counter] = []; 
          
          //types
          if(type.length != null){
            var len = type.length;
            var typesTxt = "Categories: ";
            for(var i=0; i<len; i++){
              typesTxt += type[i] +", ";
            }
            typesTxt = typesTxt.substring(0, typesTxt.length - 2); //remove last ', '
          } else
            typesTxt= "(This place is in an undefined category)";
            
          placeArr[counter] = [name, typesTxt, address, photo, lat, lng];
          console.log("COUNTER: "+counter+". i="+i);
      }else
        continue;
      } catch(err) {
        console.log("Place property is missing i="+i);
      }*/
 

function createMess(placeArr, callback){
  //placeArr[counter] = [name, typesTxt, address, photo, lat, lng];
  
  var messageData = {
    "messages": [
      {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: placeArr[0][0],
            subtitle: placeArr[0][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[0][4] +","+placeArr[0][5],
              title: placeArr[0][2]
            }]
          }, {
           title: placeArr[1][0],
            subtitle: placeArr[1][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[1][4] +","+placeArr[1][5],
              title: placeArr[1][2]
            }]
            }, {
            title: placeArr[2][0],
            subtitle: placeArr[2][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[2][4] +","+placeArr[2][5],
              title: placeArr[2][2]
            }]
            }, {
            title: placeArr[3][0],
            subtitle: placeArr[3][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[3][4] +","+placeArr[3][5],
              title: placeArr[3][2]
            }]
            }, {
            title: placeArr[4][0],
            subtitle: placeArr[4][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[4][4] +","+placeArr[4][5],
              title: placeArr[4][2]
            }]
            }
          ]
        }
      }
    }
    ]
  };
  return callback(messageData);

}


function getAllTypes(typesArr){
  
  if(typesArr.length != null){
    var len = typesArr.length;
    var typesTxt = "Categories: ";
    for(var i=0; i<len; i++){
      typesTxt += typesArr[i] +", ";
    }
    typesTxt = typesTxt.substring(0, typesTxt.length - 2); //remove last ', '
    return typesTxt;
  } else
    return "(This place is in an undefined category)";
}


