/* 
 * Description: this file contains the main controller of the web applicaation.
 * The router functions that can be accessed from the Express Router. 
 * The main controller deligates tasks furhter to server side modules.
 */

var path = require('path');
var googlePlaces = require(path.join(__dirname, '/../dataModel/googlePlacesAPI.js'))

//start with default routing to the startpage
module.exports.index = function(req,res){
    res.sendFile(path.join(__dirname, '/../views/index.html'));
}

//get place information from Google Places API Web Services
module.exports.gPlaces = function(req,res){
    var placeType = req.query.type;
    
    googlePlaces.getPlaces(placeType,function(response){
        console.log("Request to Google Places API");
        res.send(response);
    });
}





