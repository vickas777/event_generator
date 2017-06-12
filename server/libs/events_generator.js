'use strict';

const async = require('async');
const getEmployeeConfig = require('./employee_config');
const getBankHolidays = require('./bank_holidays');
const getWorkDays = require('./work_events');

const START_WORK_DAY = '09:00';
const END_WORK_DAY = '17:00';

const generateWorkEvent = day => `Works on ${day} from ${START_WORK_DAY} to ${END_WORK_DAY}.`

module.exports = function (options, callback) {
  
  async.parallel({
    employeeConfig: function (cb) {
      getEmployeeConfig(options, (err, res) => {
        if ( err ) {
          cb(err);
          return;
        }
        if ( res.err ) {
          cb(new Error(res.err));
          return;
        }
        
        cb(null, res.result)
      });
    },
    bankHolidays:   function (cb) {
      getBankHolidays(options, (err, res) => {
        if ( err ) {
          cb(err);
          return;
        }
        if ( res.err ) {
          cb(new Error(res.err));
          return;
        }
        
        cb(null, res.result)
      });
    }
  }, (err, result) => {
    if ( err ) {
      callback(err);
      return;
    }
    
    const { employeeConfig, bankHolidays } = result;
    const workDays = getWorkDays(employeeConfig.period, employeeConfig.holidays, bankHolidays.holidays);
    const resultJSON = {}
    resultJSON.name = employeeConfig.name;
    resultJSON.period = employeeConfig.period;
    resultJSON.country = bankHolidays.country;
    resultJSON.work_events = workDays.map(generateWorkEvent);
    callback(null, resultJSON);
  })
  
}
