/* Author students: Linnea Strågefors, Alexander Eckmaier
 * Date: 2016-05-26
 * Course: Internet Architectures (4ME307), assignment 3
 *
 * Description: call to Zomato API external service. 
 */ 


const https = require('https');
var zKey = "ce83bfb23d10d3a35fb882c3087cd61d";

module.exports = {
  httpsReq: function(zQuery, lat, lng, callback){

    var zpath = "/api/v2.1/search?q="+zQuery+"&lat="+lat+"&lon="+lng;
    var encoded_zpath = encodeURI(zpath); //for spaces between multiple search words
    
    var options = {
      hostname: 'developers.zomato.com',
      port: 443,
      path: encoded_zpath,
      method: 'GET', 
      headers: {
        'Accept': 'application/json',
        'user-key': zKey        
      }
    };
    
    var req = https.request(options, (res) => {
      //console.log('statusCode: ', res.statusCode);
      //console.log('headers: ', res.headers);
        var data ='';
    
      res.on('data', (d) => {
        //process.stdout.write(d);
        data += d;
      });
      
      res.on('end', function () {
        //console.log(data);
        return callback(data); //json format
      });
    });
    req.end();
    
    req.on('error', (e) => {
      console.error(e);
    });
  }
};