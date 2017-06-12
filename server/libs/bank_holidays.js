'use strict';

const utils = require('./utils');
const isObject = utils.isObject;
const isFunction = utils.isFunction;
const isValidDate = utils.isValidDate;
const getError = utils.getError;

const querystring = require('querystring');

const settings = require(process.env.SETTINGS);
const performRequest = require('./http_request');

const getBankHolidays = function (options, callback) {
  if ( !isFunction(callback) ) {
    throw getError('Callback is not a function!');
  }
  
  if ( !isObject(options) ) {
    callback(getError('Wrong options!'));
    return;
  }
  
  const { country, dateFrom, dateTo } = options;
  
  if ( typeof country !== 'string' ) {
    callback(getError('Wrong country name!'));
    return;
  }
  
  if ( country.length !== 2 ) {
    callback(getError('Wrong country code!'));
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
  const endpoint = settings.hostHolidaysEndpoint +
    '/' +
    querystring.escape(country) +
    '?' +
    querystring.stringify(getParams);
  
  const restRequestOptions = {
    host:   settings.hostHolidays,
    port:   settings.portRest,
    path:   endpoint,
    method: 'GET',
  };
  
  performRequest(restRequestOptions, callback);
}

module.exports = getBankHolidays;

