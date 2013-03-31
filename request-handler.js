/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var handleRequest = function(request, response) {
zaz  request.on('data', function(data){
    console.log(data);
  })

  response.end("Hello, World! ");

};

exports.handleRequest = handleRequest;

    // $.ajax({
    //   url: baseURL,
    //   type: 'post',
    //   contentType: 'application/json',
    //   data: JSON.stringify(messageData)
    // }).done(function (data) {
    //   addMessages($.extend(messageData, data));
    // });
  // });

  // var grabMessages = function (limit) {
  //   $.ajax({
  //     url: baseURL,
  //     type: 'get',
  //     data: 'where={"createdAt":{"$gte":{"__type":"Date","iso":"' + (new Date(limit)).toISOString() + '"}}}'
  //   }).done(function (data) {
  //     data.results && data.results.forEach(addMessages);
  //   });