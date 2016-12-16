var path = require('path');
const https = require('https');

// Geocode an address.
module.exports = {

  getPlaces: function(type, callback){
    //var key = 'AIzaSyA8PtE7o-EZgfVOoABhitN6yV10jr-UM5A'; 
    //var key = 'AIzaSyBV6zeRCH8WJ3nou-uiwYToG3Rnlsy7oRU';
    var key = 'AIzaSyC3NLfEx9mW-CMBymzLAjrxJByQzzxN1mg'; 
    
    var searchquery = 'kronoberg'; //not åäö --> aao as Vaxjo
    //var type = 'bakery|restaurant|cafe'
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=" + key + "&query="+searchquery+ "&type="+type;

    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
      //var parsed = JSON.parse(data);
      //console.log(parsed['results'][0].name);
        //return callback(data) //json format
        var placeArr = generatePlaceArr(data);
        var message = createMess(placeArr);
        return callback(message);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};

function generatePlaceArr(data){
  var placeArr = [];
  var parsed = JSON.parse(data);
  var len = parsed['results'].length;
  var counter = 0; //init
  var flagFirst = 0;

  //get 7 google place items. Place in array.
  for(var i=0; i<len; i++){
    try{
      var name = parsed['results'][i].name;
      var type = parsed['results'][i].types;
      var address = parsed['results'][i].formatted_address;
      var photo_htmlattr = parsed['results'][i].photos[0].html_attributions[0];
      var photo_ref = parsed['results'][i].photos[0].photo_reference;
      var photo = "photo"; //getPlacePhoto();
      var lat = parsed['results'][i].geometry.location.lat;
      var lng = parsed['results'][i].geometry.location.lng;

      if( (address != 'undefined') && (photo_htmlattr!= 'undefined') && (name != 'undefined') 
      && (photo_ref != 'undefined') && (counter < 4 ) ){
          if(flagFirst==0){
            counter=0;
            flagFirst=1;
          }
          else
            counter=counter+1;
          placeArr[counter] = []; //place nr.
          placeArr[counter] = [name, getAllTypes(type), address, getGmapsURL(photo_htmlattr), photo, lat, lng];
          console.log("COUNTER: "+counter+". i="+i);
      }else
        continue;
      } catch(err) {
        console.log("Place property is missing i="+i);
      }
  }
  return placeArr;
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

function getGmapsURL(gmapsURL){
    gmapsURL = gmapsURL.replace(/['"]+/g, '');
    gmapsURL = gmapsURL.slice(8);
    gmapsURL = gmapsURL.substring(0, gmapsURL.indexOf('>'));
    return gmapsURL;
}

function createMess(placeArr){
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
              url: "http://maps.google.com/maps?q=loc:"+placeArr[0][5] +","+placeArr[0][6],
              title: placeArr[0][2]
            }]
          }, {
           title: placeArr[1][0],
            subtitle: placeArr[1][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[1][5] +","+placeArr[1][6],
              title: placeArr[1][2]
            }]
            }, {
            title: placeArr[2][0],
            subtitle: placeArr[2][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[2][5] +","+placeArr[2][6],
              title: placeArr[2][2]
            }]
            }, {
            title: placeArr[3][0],
            subtitle: placeArr[3][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[3][5] +","+placeArr[3][6],
              title: placeArr[3][2]
            }]
            }, {
            title: placeArr[4][0],
            subtitle: placeArr[4][1],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[4][5] +","+placeArr[4][6],
              title: placeArr[4][2]
            }]
            }
          ]
        }
      }
    }
    ]
  };
  return messageData;

}

