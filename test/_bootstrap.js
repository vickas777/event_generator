'use strict';

const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const dirtyChai = require('dirty-chai');
const datetimeChai = require('chai-datetime');

global.ROOT_PATH = path.resolve(__dirname, '../');

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;

chai.use(sinonChai);
chai.use(dirtyChai);
chai.use(datetimeChai);

chai.config.includeStack = true;