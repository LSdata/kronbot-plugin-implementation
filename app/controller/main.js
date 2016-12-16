/* 
 * Description: this file is the main controller of the web applicaation.
 * This files contains functions that can be accessed from the Express Router. 
 */

var path = require('path');
var googlePlaces = require(path.join(__dirname, '/../dataModel/googlePlacesAPI.js'))

//start with default routing to the startpage
module.exports.index = function(req,res){
    res.sendFile(path.join(__dirname, '/../views/index.html'));
}

//search results page
module.exports.gPlaces = function(req,res){
        var placeType = req.query.type;
        
        googlePlaces.getPlaces(placeType,function(response){
            console.log("Request to Google Places API");
            res.send(response);//
        });
    
}





