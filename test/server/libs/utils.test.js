'use strict';

const faker = require('faker');
faker.seed(127323093753);
const utils = require(ROOT_PATH + '/server/libs/utils');
const isObject = utils.isObject;
const isFunction = utils.isFunction;
const isValidDate = utils.isValidDate;
const getError = utils.getError;

describe('Utilities tests', function () {
  // Test data
  const number = faker.random.number();
  const string = faker.random.word();
  const bool = faker.random.boolean();
  const _null = null;
  let _undefined;
  const emptyObj = {};
  const obj = { a: 2 };
  const array = [1, 2, 3, 4, 5];
  const _function = function () {
    return false;
  };
  const newDate = new Date();
  const dateString = faker.date.past();
  
  
  describe('#isObject()', function () {
    it('should export a function', function() {
      expect(isObject).to.be.a('function');
    });
    
    it('should be true', function () {
      expect(isObject(emptyObj)).to.be.true();
      expect(isObject(obj)).to.be.true();
    });
  
    it('should be false', function () {
      expect(isObject(number)).to.be.false();
      expect(isObject(string)).to.be.false();
      expect(isObject(bool)).to.be.false();
      expect(isObject(array)).to.be.false();
      expect(isObject(_null)).to.be.false();
      expect(isObject(_undefined)).to.be.false();
    });
  });
  
  describe('#isFunction()', function () {
    it('should export a function', function() {
      expect(isFunction).to.be.a('function');
    });
  
    it('should be true', function () {
      expect(isFunction(_function)).to.be.true();
    });
  
    it('should be false', function () {
      expect(isFunction(number)).to.be.false();
      expect(isFunction(string)).to.be.false();
      expect(isFunction(bool)).to.be.false();
      expect(isFunction(array)).to.be.false();
      expect(isFunction(_null)).to.be.false();
      expect(isFunction(_undefined)).to.be.false();
      expect(isFunction(obj)).to.be.false();
    });
  });
  
  describe('#isValidDate()', function () {
    it('should export a function', function() {
      expect(isValidDate).to.be.a('function');
    });
  
    it('should be true', function () {
      expect(isValidDate(dateString)).to.be.true();
      expect(isValidDate(newDate)).to.be.true();
    });
  
    it('should be false', function () {
      expect(isValidDate(string)).to.be.false();
      expect(isValidDate(bool)).to.be.false();
      expect(isValidDate(array)).to.be.false();
      expect(isValidDate(_undefined)).to.be.false();
      expect(isValidDate(obj)).to.be.false();
      expect(isValidDate(_function)).to.be.false();
    });
  });
  
  describe('#getError()', function () {
    const msg = 'This is error!';
    it('should export a function', function() {
      expect(getError).to.be.a('function');
    });
  
    it('should return error message', function() {
      expect(getError(msg)).to.be.an.instanceof(Error);
      expect(getError(msg).message).to.be.equal(msg);
    });
    
  });
});
