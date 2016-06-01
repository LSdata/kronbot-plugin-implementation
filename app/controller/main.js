/* Author students: Linnea Strågefors, Alexander Eckmaier
 * Date: 2016-05-22
 * Course: Internet Architectures (4ME307), assignment 3
 *
 * Description: this file is the main controller of the web applicaation.
 * This files contains functions that can be accessed from the Express Router. 
 */

var path = require('path');
var googlePlaces = require(path.join(__dirname, '/../dataModel/googlePlaces.js'))
var zomato = require(path.join(__dirname, '/../dataModel/zomato.js'))

//start with default routing to the startpage
module.exports.index = function(req,res){
    res.sendFile(path.join(__dirname, '/../views/index.html'));
}

//search results page
module.exports.search = function(req,res){
    var searchWord = req.body.search;
    res.render('search',{search: searchWord});
}

//request to Google Places API
module.exports.gPlaces = function(req,res){
    var searchQuery = req.query.search;
    console.log("Google Places search word: " + searchQuery);
  
    googlePlaces.httpsGet(searchQuery,function(response){
      console.log("Request to Google Places API");
      res.send(response);
    });
};

//request to Zomato API
module.exports.zomato = function(req,res){
    var zQuery = req.query.q;
    var lat = req.query.lat;
    var lng = req.query.lng;

    console.log("Zomato search word: " + zQuery);
  
    zomato.httpsReq(zQuery, lat, lng, function(response){
      console.log("Request to Zomato API");
      res.send(response);
    });
    
}




