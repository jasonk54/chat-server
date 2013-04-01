/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var data = [];

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  if (url.parse(request.url).pathname === '/classes/room1') {
    var statusCode = 200;
  } else {
    var statusCode = 404;
  }
  var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
  };
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  request.on('data', function(chunk) {
    if (request.method === 'POST') {
      data.push(querystring.parse(chunk.toString()));
    }
  });

  request.on('end', function() {
    if(request.method === 'POST') {
      statusCode = 302;
      response.writeHead(statusCode, headers);
      response.end('\n');
    } else {
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(data) || []);
    }
  });
};

exports.handleRequest = handleRequest;

