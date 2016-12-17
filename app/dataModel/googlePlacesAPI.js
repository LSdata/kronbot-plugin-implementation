var path = require('path');
const https = require('https');

// Geocode an address.
module.exports = {

  getPlaces: function(type, callback){
   
    //var key = 'AIzaSyBjEUp9wJIW-7y8YmU_iTX5nzC652atjgc';
    var key = 'AIzaSyBn60XRXSKKUI-LRtkgTOhqY7vXN5UkDeA';
    //var key = 'AIzaSyCFqKvQaHJPzOw87j-doG1QcwGH3HHgRLs';
    
    var searchquery = 'kronoberg'; //not åäö --> aao as Vaxjo
    //var type = 'bakery|restaurant|cafe' //syntax for multiple categories
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=" + key + "&query="+searchquery+ "&type="+type;

    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        
       generatePlaceArr(data, function(arr) {
          /*
          createMess(arr, function(mess) {
            return callback(mess)
          });*/
          //5 callbacks to get photo and add to array
          getPlacePhoto(arr[0][3], function(photo_ref0) {
              arr[0][3] = photo_ref0;
              getPlacePhoto(arr[0][3], function(photo_ref1) {
                arr[1][3] = photo_ref1;
                getPlacePhoto(arr[2][3], function(photo_ref2) {
                  arr[2][3] = photo_ref2;
                  getPlacePhoto(arr[3][3], function(photo_ref3) {
                    arr[3][3] = photo_ref3;
                    getPlacePhoto(arr[4][3], function(photo_ref4) {
                      arr[4][3] = photo_ref4;
                      createMess(arr, function(mess) {
                        return callback(mess)
                      });
                    });
                  });
                });
              });
          });
        });
        
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
  var counter = -1; //init
  var flagFirst = 0;

  //get 7 google place items. Place in array.
  for(var i=0; i<len; i++){
      var name = parsed['results'][i].name;
      var type="Categories: "
      var address = parsed['results'][i].formatted_address;
      var photo = "photo"; //getPlacePhoto();
      var lat = parsed['results'][i].geometry.location.lat;
      var lng = parsed['results'][i].geometry.location.lng;
      var ref ="ref";
      var images = parsed['results'][i].photos;
      var categTypes = parsed['results'][i].types;
      
      if(images && categTypes && name && address && lat && lng && counter <4){
        counter++;
        ref = parsed['results'][i].photos[0].photo_reference;
        
        //get place categories
        var typesArr = parsed['results'][i].types;
        var typesLen = typesArr.length;
        
        for(var k=0; k<typesLen; k++){
          type += typesArr[k]+", ";
        }
        type = type.substring(0, type.length - 2); //remove last ', '
        placeArr[counter] = [name, type, address, ref, lat, lng];
      }
      
    }
    return callback(placeArr);
}
  
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
            image_url: placeArr[0][3], 
            subtitle: placeArr[0][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[0][4] +","+placeArr[0][5],
              title: placeArr[0][2]
            }]
          }, {
            title: placeArr[1][0],
            image_url: placeArr[1][3], 
            subtitle: placeArr[1][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[1][4] +","+placeArr[1][5],
              title: placeArr[1][2]
            }]
            }, {
            title: placeArr[2][0],
            image_url: placeArr[2][3], 
            subtitle: placeArr[2][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[2][4] +","+placeArr[2][5],
              title: placeArr[2][2]
            }]
            }, {
            title: placeArr[3][0],
            image_url: placeArr[3][3], 
            subtitle: placeArr[3][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[3][4] +","+placeArr[3][5],
              title: placeArr[3][2]
            }]
            }, {
            title: placeArr[4][0],
            image_url: placeArr[4][3], 
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


function getPlacePhoto(photo_ref, callback){
   
    //var key = 'AIzaSyBjEUp9wJIW-7y8YmU_iTX5nzC652atjgc';
    var key = 'AIzaSyBn60XRXSKKUI-LRtkgTOhqY7vXN5UkDeA';
    //var key = 'AIzaSyCFqKvQaHJPzOw87j-doG1QcwGH3HHgRLs';

    var url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=752&photoreference="+photo_ref+"&key="+key;

    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        //image withdrawn from client, error message
        if (data.substring(0, 4) == "<!DO") {
          data='https://chatbot-json2-lsdata.c9users.io/public/images/noIm.png';
        
        //image exists
        }else
          data = data.substring(168, data.length - 29); //remove last ', '
        callback(data);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }

