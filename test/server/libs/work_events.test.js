'use strict';

const faker = require('faker');
faker.seed(127323093753);
const workEvents = require(ROOT_PATH + '/server/libs/work_events');

describe('Work events date generator', function () {
  const period = {
    from: '2017-01-01',
    to:   '2017-01-04'
  }
  const data = [
    {
      period:       period,
      bankHolidays: [],
      holidays:     [],
      result:       [
        '2017-01-01',
        '2017-01-02',
        '2017-01-03',
        '2017-01-04',
      ],
    },
    {
      period:       period,
      bankHolidays: [],
      holidays:     ['2017-01-04'],
      result:       [
        '2017-01-01',
        '2017-01-02',
        '2017-01-03',
      ],
    },
    {
      period:       period,
      bankHolidays: ['2017-01-01'],
      holidays:     ['2017-01-04'],
      result:       [
        '2017-01-02',
        '2017-01-03',
      ],
    },
    {
      period:       period,
      bankHolidays: ['2017-01-01'],
      holidays:     [
        '2017-01-04',
        '2017-01-02',
        '2017-01-03',
      ],
      result:       [],
    },
  ]
  
  data.forEach(item => {
    it(`should return array with length ${item.result.length}`, function () {
      expect(workEvents(item.period, item.holidays, item.bankHolidays)).to.be.instanceOf(Array);
      expect(workEvents(item.period, item.holidays, item.bankHolidays)).to.have.lengthOf(item.result.length);
      expect(workEvents(item.period, item.holidays, item.bankHolidays)).to.be.eql(item.result);
    });
  });
  
});