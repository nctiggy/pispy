//
// app.js  	MJPEG streamer for motion on RPi
// version	0.0.1 
// author	Brian Walter @briantwalter
// description	Creates an image url to stream from
//		the motion software's live/raw feed.
//

// variables
var port = '8800';
var stream = 'http://localhost:8081';
var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
var express = require('express');

// functions

// main
var app = express();
app.use(app.router);
app.use(express.logger('dev'))
app.use(express.errorHandler());

// redirect to oops page if we have to
app.get('/', function(req, res) {
  res.redirect('http://oops.walternet.us');
})

// show the stream if requested
app.get('/live.jpg', new MjpegProxy(stream).proxyRequest);

// start the http server on CF or locally
app.listen(process.env.VCAP_APP_PORT || port);
