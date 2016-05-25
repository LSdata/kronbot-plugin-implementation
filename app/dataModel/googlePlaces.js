   
const https = require('https');
var key = 'AIzaSyA8PtE7o-EZgfVOoABhitN6yV10jr-UM5A'; //exceeded daily 24 May
//var key = 'AIzaSyBV6zeRCH8WJ3nou-uiwYToG3Rnlsy7oRU';
  
module.exports = {
  httpsGet: function(searchquery, callback){
    var type = 'restaurant';
    //var searchquery = 'ramlosa wok'; //not åäö --> aao as Vaxjo
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=" + key + "&query="+searchquery+ "&type="+type;

    //console.log(url); //check results
    
    https.get(url, function(response) {
      var body ='';
      response.on('data', function(chunk) {
        body += chunk;
      });

      response.on('end', function() {
        //var places = JSON.parse(body);
        //var locations = places.results;
        //console.log(body);
        return callback(body); //json format
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};




   

   
