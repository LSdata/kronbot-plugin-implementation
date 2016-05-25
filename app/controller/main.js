/* Author student: Linnea Strågefors
 * Date: 2016-05-22
 * Course: Internet Architectures (4ME307), assignment 3
 *
 * Description: this file is the main controller of the web applicaation.
 * This files contains functions that can be accessed from the Express Router. 
 */

var path = require('path');
var googlePlaces = require(path.join(__dirname, '/../dataModel/googlePlaces.js'))


//start with default routing to the startpage
module.exports.index = function(req,res){
    res.sendFile(path.join(__dirname, '/../views/index.html'));
}

//request to Google Places API
module.exports.gPlaces = function(req,res){
    var searchQuery = req.query.search;
    console.log("search word:" + searchQuery);
  
    googlePlaces.httpsGet(searchQuery,function(response){
      console.log("Request to Google Places API");
      res.send(response);
      //res.json("ok");
    });
};





