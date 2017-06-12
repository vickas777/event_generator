'use strict'

const utils = {};

/**
 * Test if passed parameter is function
 * @param object {any} - parameter for testing
 * @returns {boolean}
 */
utils.isFunction = function (object) {
  return !!(object && object.constructor && object.call && object.apply);
};

/**
 * Test if passed parameter is object
 * @param object {any} - parameter for testing
 * @returns {boolean}
 */
utils.isObject = function (object) {
  return object === Object(object) && !Array.isArray(object);
};

/**
 * Test if passed parameter is valid date
 * @param parameter {any} - parameter for testing
 * @returns {boolean}
 */
utils.isValidDate = function (parameter) {
  return !isNaN(Date.parse(parameter))
};

/**
 * Error generator
 * @param message {string} - custom error message
 * @returns {boolean}
 */
utils.getError = function (message = '') {
  return new Error(message);
};

/**
 * Create UTC date from parameter
 * @param date {string | Object | number} - date
 * @returns {Date} - UTC date
 */
utils.createDateAsUTC = function (date = Date.now()) {
  date = new Date(date);
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
};


module.exports = utils;