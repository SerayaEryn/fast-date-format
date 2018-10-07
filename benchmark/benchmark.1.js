/* eslint-disable no-console */
'use strict'

var benchmark = require('fastbench')
var moment = require('moment')
var dateFormat = require('dateformat')
var format = require('date-format')
var fecha = require('fecha')
var speedDate = require('speed-date')

var DATE_FORMAT = ('YYYY.MM.DDTHH:mm:ss,SSS ZZ')
var DateFormatter = require('../DateFormatter')
var dateFormatter = new DateFormatter(DATE_FORMAT)

var speedDateFormatter = speedDate(DATE_FORMAT)

const run = benchmark([
  /*function benchMoment (cb) {
    for (let i = 0; i < 100; i++) {
      moment().format(DATE_FORMAT)
    }
    setImmediate(cb)
  },
  function benchDateHyphenFormat (cb) {
    for (let i = 0; i < 100; i++) {
      format(DATE_FORMAT, new Date())
    }
    setImmediate(cb)
  },
  function benchDateFormat (cb) {
    for (let i = 0; i < 100; i++) {
      dateFormat(new Date(), DATE_FORMAT)
    }
    setImmediate(cb)
  },
  function benchFecha (cb) {
    for (let i = 0; i < 100; i++) {
      fecha.format(new Date(), DATE_FORMAT)
    }
    setImmediate(cb)
  },*/
  function benchSpeedDate (cb) {
    for (let i = 0; i < 100; i++) {
      speedDateFormatter(new Date())
    }
    setImmediate(cb)
  },
  function benchFastDateFormat (cb) {
    for (let i = 0; i < 100; i++) {
      dateFormatter.format(new Date())
    }
    setImmediate(cb)
  }
], 10000)

run(run)

