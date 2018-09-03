/* eslint-disable no-console */
'use strict'

var Benchmark = require('benchmark')
var moment = require('moment')
var dateFormat = require('dateformat')
var format = require('date-format')

var DateFormatter = require('../DateFormatter')
var dateFormatter = new DateFormatter()

var DATE_FORMAT = ('ZZ')

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
    dateFormatter.format(DATE_FORMAT)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ 'async': true })
