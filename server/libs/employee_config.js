'use strict';

const utils = require('./utils');
const isObject = utils.isObject;
const isFunction = utils.isFunction;
const isValidDate = utils.isValidDate;
const getError = utils.getError;

const querystring = require('querystring');

const settings = require(process.env.SETTINGS);
const performRequest = require('./http_request');

const getEmployeeConfig = function (options, callback) {
  // todo create general validator
  
  if ( !isFunction(callback) ) {
    throw getError('Callback is not a function!');
  }
  
  if ( !isObject(options) ) {
    callback(getError('Wrong options!'));
    return;
  }
  
  const { name, dateFrom, dateTo } = options;
  
  if ( typeof name !== 'string' ) {
    callback(getError('Name should be string!'));
    return;
  }
  
  if ( name.split(' ') < 2 ) {
    callback(getError('Name is too short'));
    return;
  }
  
  if ( !isValidDate(dateFrom) ) {
    callback(getError('Invalid from date!'))
    return;
  }
  
  if ( !isValidDate(dateTo) ) {
    callback(getError('Invalid to date!'))
    return;
  }
  
  // get parameters object
  const getParams = {
    dateFrom: dateFrom,
    dateTo:   dateTo,
  };
  
  // generate full path for API
  const endpoint = settings.hostConfigEndpoint +
    '/' +
    querystring.escape(name) +
    '?' +
    querystring.stringify(getParams);
  
  const restRequestOptions = {
    host:   settings.hostConfig,
    port:   settings.portRest,
    path:   endpoint,
    method: 'GET',
  };
  
  performRequest(restRequestOptions, callback);
}

module.exports = getEmployeeConfig;