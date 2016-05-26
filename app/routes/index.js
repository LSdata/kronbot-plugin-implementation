var express = require('express');
var router = express.Router();
var path = require('path');
var controller = require(path.join(__dirname, '/../controller/main.js'))

/* Author students: Linnea Strågefors, Alexander Eckmaier
 * Date: 2016-05-22
 * Course: Internet Architectures (4ME307), assignment 3
 *
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

//service: return search results of Google Places API restaurants
router.get("/gPlaces", controller.gPlaces);

//service: return search results of Zomato API restaurants
router.get("/zomato", controller.zomato);

module.exports = router;
