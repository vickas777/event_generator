'use strict'

const utils = require('utils');
const isObject = utils.isObject;
const isFunction = utils.isFunction;
const isValidDate = utils.isValidDate;
const getError = utils.getError;

const valdators = {};

valdators.country = function (country) {
  const errors = [];
  if ( typeof country !== 'string' ) {
    errors.push('Wrong country name!');
  }
  
  if ( typeof country.length !== 2 ) {
    errors.push('Wrong country code!');
  }
  
  return errors.length ? true : errors;
}