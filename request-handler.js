var http = require('http');
var url = require('url');
var querystring = require('querystring');
var data = [];

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  if ((url.parse(request.url).pathname).match(/\/classes\//)) {
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
  headers['Content-Type'] = "application/json";

  request.on('data', function(chunk) {
    if (request.method === 'POST') {
      var message = querystring.parse(chunk.toString());
      data.push(message);
    }
  });

  request.on('end', function() {
    if(request.method === 'POST') {
      statusCode = 302;
      response.writeHead(statusCode, headers);
      response.end('\n');
    } else if (request.method === 'GET') {
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(data) || []);
    }
  });
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

exports.handleRequest = handleRequest;

