'use strict'

var test = require('ava')
var DateFormatter = require('..')

test('E', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('E')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '4')
})

test('dddd', (t) => {
  testFormatDate(t, 'dddd', 0, 'Tuesday')
  testFormatDate(t, 'dddd', 1, 'Wednesday')
  testFormatDate(t, 'dddd', 2, 'Thursday')
  testFormatDate(t, 'dddd', 3, 'Friday')
  testFormatDate(t, 'dddd', 4, 'Saturday')
  testFormatDate(t, 'dddd', 5, 'Sunday')
  testFormatDate(t, 'dddd', 6, 'Monday')
  testFormatDate(t, 'dddd', 7, 'Tuesday')
})

test('ddd', (t) => {
  testFormatDate(t, 'ddd', 0, 'Tue')
  testFormatDate(t, 'ddd', 1, 'Wed')
  testFormatDate(t, 'ddd', 2, 'Thu')
  testFormatDate(t, 'ddd', 3, 'Fri')
  testFormatDate(t, 'ddd', 4, 'Sat')
  testFormatDate(t, 'ddd', 5, 'Sun')
  testFormatDate(t, 'ddd', 6, 'Mon')
  testFormatDate(t, 'ddd', 7, 'Tue')
})

test('DDDD', (t) => {
  testFormatDayOfYear(t, 'DDDD', 1, 1, '032')
  testFormatDayOfYear(t, 'DDDD', 1, 30, '061')
  testFormatDayOfYear(t, 'DDDD', 2, 30, '090')
  testFormatDayOfYear(t, 'DDDD', 3, 30, '121')
})

test('DDD', (t) => {
  testFormatDayOfYear(t, 'DDD', 1, 1, '32')
  testFormatDayOfYear(t, 'DDD', 1, 30, '61')
  testFormatDayOfYear(t, 'DDD', 2, 30, '90')
  testFormatDayOfYear(t, 'DDD', 3, 30, '121')
})

test('No Leapyear 1', (t) => {
  var date = new Date(2015, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('DDDD')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '060')
})

test('DD', (t) => {
  testFormatDate(t, 'DD', 1, '01')
  testFormatDate(t, 'DD', 2, '02')
  testFormatDate(t, 'DD', 30, '30')
  testFormatDate(t, 'DD', 31, '31')
})

test('D', (t) => {
  testFormatDate(t, 'D', 1, '1')
  testFormatDate(t, 'D', 2, '2')
  testFormatDate(t, 'D', 30, '30')
  testFormatDate(t, 'D', 31, '31')
})

function testFormatDate (t, format, date1, h) {
  var date = new Date(2000, 2, date1, 1, 4, 5, 1)
  var dateFormatter = new DateFormatter(format)
  var formatted = dateFormatter.format(date)
  t.is(formatted, h)
}

function testFormatDayOfYear (t, format, month, date1, h) {
  var date = new Date(2000, month, date1, 1, 4, 5, 1)
  var dateFormatter = new DateFormatter(format)
  var formatted = dateFormatter.format(date)
  t.is(formatted, h)
}
