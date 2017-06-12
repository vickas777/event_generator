'use strict';
const utils = require('./utils');
const createDateAsUTC = utils.createDateAsUTC;
/**
 * Work events generator
 * @param workPeriod {Object} - work events period
 * @param workPeriod.from {Object | string | number} - work events start
 * @param workPeriod.to {Object | string | number} - work events end
 * @param empHolidays {Array} - array of employee holidays
 * @param bankHolidays {Array} - array of bank holidays
 * @returns {Array}
 */
module.exports = function (workPeriod, empHolidays, bankHolidays) {
  const timestampFrom = new Date(workPeriod.from).getTime();
  const timestampTo = new Date(workPeriod.to).getTime();
  
  const concatHolidays = [].concat(empHolidays, bankHolidays);
  const uniqHolidays = Array.from(new Set(concatHolidays));
  const holidays = uniqHolidays.map((day) => day.slice(0, 10));
  
  // array of work days
  let workDays = []
  for ( let i = timestampFrom; i <= timestampTo; ) {
    const dateKey = new Date(i)
      .toISOString()
      .slice(0, 10);
    
    if ( holidays.indexOf(dateKey) === -1 ) {
      workDays.push(dateKey);
    }
    
    i = i + 1000 * 60 * 60 * 24;
  }
  
  return workDays;
}