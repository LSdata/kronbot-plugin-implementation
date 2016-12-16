var express = require('express');
var router = express.Router();
var path = require('path');
var controller = require(path.join(__dirname, '/../controller/main.js'))

/* 
 * Description: a routing API for HTTP verb methods. 
 * Provided by the Express.js Router and a RESTful interface.
 * The routing interface also redirects to the corresponding functions in 
 * in the app controller (/controller/main.js).
 */

/* GET home page. */
router.use(function (req,res,next) {
  next();
});

//start with default routing to the startpage
router.get("/", controller.index);

//for example https://chatbot-json-lsdata.c9users.io/googlePlacesAPI?type=restaurant
router.get("/googlePlacesAPI", controller.gPlaces);


module.exports = router;
