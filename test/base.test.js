'use strict'

var t = require('tap')
var test = t.test
var DateFormatter = require('..')

test('x', (t) => {
  t.plan(1)
  var date = new Date()
  date.setTime(951879845001)
  var dateFormatter = new DateFormatter('x')

  var formatted = dateFormatter.format(date)

  t.strictEquals(formatted, '951879845001')
})

test('YYYYMMDD', (t) => {
  t.plan(1)
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YYYYMMDD')

  var formatted = dateFormatter.format(date)

  t.strictEquals(formatted, '20000301')
})

test('YYYY-MM-DDTHH:mm:ss', (t) => {
  t.plan(1)
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YYYY-MM-DDTHH:mm:ss')

  var formatted = dateFormatter.format(date)

  t.strictEquals(formatted, '2000-03-01T03:04:05')
})

test('YYYY-MM-DDTHH:mm:ss,SSS', (t) => {
  t.plan(1)
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YYYY-MM-DDTHH:mm:ss,SSS')

  var formatted = dateFormatter.format(date)

  t.strictEquals(formatted, '2000-03-01T03:04:05,001')
})

test('YYYY-MM-DDTHH:mm:ss,SSS', (t) => {
  t.plan(1)
  var date = new Date(2000, 2, 1, 3, 4, 5, 111)
  var dateFormatter = new DateFormatter('YYYY-MM-DDTHH:mm:ss,SSS')

  var formatted = dateFormatter.format(date)

  t.strictEquals(formatted, '2000-03-01T03:04:05,111')
})

test('x', (t) => {
  t.plan(1)
  var dateFormatter = new DateFormatter('x')

  var formatted = dateFormatter.format()

  t.ok(formatted)
})
