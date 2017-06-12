'use strict';

const express = require('express');
const router = express.Router();
const getEvents = require('../libs/events_generator');
let events;

router.get('/', function (req, res, next) {
  // res.json(events);
  res.locals.events = JSON.stringify(events, null, 2);
  res.render('events');
});

// route for main paige form
router.post('/', function (req, res, next) {
  getEvents(req.body, (err, result) => {
    if ( err ) {
      next(err);
      return;
    }
    
    events = result;
    res.redirect('/events');
  });
  
});

module.exports = router;
