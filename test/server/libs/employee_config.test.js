'use strict';


const faker = require('faker');
faker.seed(127323093753);
const getEmployeeConfig = require(ROOT_PATH + '/server/libs/employee_config');

describe('Getting employee config', function () {
  it('should throw error when callback is not a function', function () {
    expect(() => getEmployeeConfig()).to.throw(Error, 'Callback is not a function!');
    expect(() => getEmployeeConfig()).to.throw(Error, 'Callback is not a function!');
  });
  
  it('should return callback with error if options is not an object', function (done) {
    const options = [];
    getEmployeeConfig(options, function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });
  
  it('should return callback with error if name is not string', function (done) {
    const options = {
      name: [1, 2, 3]
    };
    getEmployeeConfig(options, function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });
  
  it('should return callback with error if name is too short', function (done) {
    const options = {
      name: faker.name.firstName()
    };
    getEmployeeConfig(options, function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });
  
  it('should return callback with error if from date is wrong', function (done) {
    const options = {
      name: faker.name.firstName() + faker.name.lastName(),
      dateFrom: 'wrong date from'
    };
    
    getEmployeeConfig(options, function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });
  
  it('should return callback with error if to date wrong', function (done) {
    const options = {
      name: faker.address.countryCode(),
      dateFrom: new Date(),
      dateTo: 'wrong date to'
    };
    
    getEmployeeConfig(options, function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });
});