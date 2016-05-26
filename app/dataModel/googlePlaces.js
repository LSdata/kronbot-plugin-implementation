/* Author students: Linnea Strågefors, Alexander Eckmaier
 * Date: 2016-05-26
 * Course: Internet Architectures (4ME307), assignment 3
 *
 * Description: call to Google Place API external service 'textsearch'. 
 * Search filter for restaurants. 
 */   
const https = require('https');
//var key = 'AIzaSyA8PtE7o-EZgfVOoABhitN6yV10jr-UM5A'; 
var key = 'AIzaSyBV6zeRCH8WJ3nou-uiwYToG3Rnlsy7oRU';
  
module.exports = {
  httpsGet: function(searchquery, callback){
    
    var type = 'restaurant'; //filter request to only search for restaurants
    //var searchquery = 'ramlosa wok'; //not åäö --> aao as Vaxjo
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=" + key + "&query="+searchquery+ "&type="+type;

    //console.log(url); //check results
    
    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        //console.log(data);
        return callback(data); //json format
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};




   

   
