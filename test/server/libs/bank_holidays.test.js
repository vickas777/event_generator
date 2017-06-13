'use strict';


const faker = require('faker');
faker.seed(127323093753);
const getBankHolidays = require(ROOT_PATH + '/server/libs/bank_holidays');

describe('Getting bank holidays', function () {
  it('should throw error when callback is not a function', function () {
    expect(() => getBankHolidays()).to.throw(Error, 'Callback is not a function!');
    expect(() => getBankHolidays()).to.throw(Error, 'Callback is not a function!');
  });
  
  it('should return callback with error if options is not an object', function (done) {
    const options = [];
    getBankHolidays(options, function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });
  
  it('should return callback with error if country is not string', function (done) {
    const options = {
      country: 12
    };
    getBankHolidays(options, function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });
  
  it('should return callback with error if country is not country code', function (done) {
    const options = {
      country: faker.address.country()
    };
    getBankHolidays(options, function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });
  
  it('should return callback with error if from date is wrong', function (done) {
    const options = {
      country: faker.address.countryCode(),
      dateFrom: 'wrong date from'
    };
    
    getBankHolidays(options, function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });
  
  it('should return callback with error if to date wrong', function (done) {
    const options = {
      country: faker.address.countryCode(),
      dateFrom: new Date(),
      dateTo: 'wrong date to'
    };
    
    getBankHolidays(options, function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });
});