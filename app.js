/*  Author student: Linnea Strågefors, Alexander Eckmaier
 * Date: 2016-05-22
 * Course: Internet Architectures (4ME307), assignment 3
 *
 * Description: this file starts the web server and initiates 
 * the Node.js Express.js application.
 */

//import required modules
http = require('http');
var path = require('path');
var express = require('express');
var routes = require('./app/routes/index'); //using the Express.js Router
var bodyParser = require('body-parser'); //used for getting data from a HTTP POST

//app setup 
var app = express();
var server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'app')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes); 
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

//start app server
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Node server listening at", addr.address + ":" + addr.port);
});
