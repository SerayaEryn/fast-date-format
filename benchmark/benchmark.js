/* eslint-disable no-console */
'use strict'

const Benchmark = require('benchmark')
const moment = require('moment')
const dateFormat = require('dateformat')
const format = require('date-format')
const fecha = require('fecha')
const speedDate = require('speed-date')
const dateFnsFormat = require('date-fns-tz').format

const DATE_FORMAT = 'YYYY.MM.DDTHH:mm:ss,SSS ZZ'
const DateFormatter = require('../DateFormatter')
const dateFormatter = new DateFormatter(DATE_FORMAT)
const speedDateFormatter = speedDate(DATE_FORMAT)

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
    dateFormatter.format(new Date())
  })
  .add('fecha', () => {
    fecha.format(new Date(), DATE_FORMAT)
  })
  .add('speed-date', () => {
    speedDateFormatter(new Date())
  })
  .add('date-fns', () => {
    dateFnsFormat(new Date(), 'yyyy.MM.dd\'T\'HH:mm:ss,SSS XXX')
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
