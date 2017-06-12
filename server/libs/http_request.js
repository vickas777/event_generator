'use strict';

const http = require('http');

/**
 * Do http request to API
 * @param options {Object} - parameters for http request
 * @param options.host {string} - host
 * @param options.path {string} - endpoint
 * @param options.port {number} - port
 * @param options.method {string} - request method
 * @param callback
 */
module.exports = function (options, callback) {
  const req = http.request(options, (res) => {
    res.setEncoding('utf-8');
    
    let responseString = '';
    
    res.on('data', function (data) {
      responseString += data;
    });
    
    res.on('end', function () {
      let responseObject;
      try {
        responseObject = JSON.parse(responseString);
      } catch ( err ) {
        callback(err);
        return;
      }
      
      callback(null, responseObject);
    });
    
    res.on('error', function (err) {
      callback(err);
    });
  });
  
  req.end();
}
