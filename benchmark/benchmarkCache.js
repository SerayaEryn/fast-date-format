/* eslint-disable no-console */
'use strict'

var Benchmark = require('benchmark')
var moment = require('moment')
var dateFormat = require('dateformat')
var format = require('date-format')
var fecha = require('fecha')
var speedDate = require('speed-date')

var DATE_FORMAT = ('YYYY.MM.DDTHH:mm:ss')
var DateFormatter = require('../DateFormatter')
var dateFormatter = new DateFormatter({ dateFormat: DATE_FORMAT, cache: true })
var speedDateFormatter = speedDate(DATE_FORMAT)

const suite = new Benchmark.Suite()

suite
  .add('moment', () => {
    moment().format(DATE_FORMAT)
  })
  .add('date-format', () => {
    format(DATE_FORMAT, new Date())
  })
  .add('dateformat', () => {
    dateFormat(new Date(), DATE_FORMAT)
  })
  .add('fast-date-format', () => {
    dateFormatter.format()
  })
  .add('fecha', () => {
    fecha.format(new Date(), DATE_FORMAT)
  })
  .add('speed-date', () => {
    speedDateFormatter(new Date())
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
