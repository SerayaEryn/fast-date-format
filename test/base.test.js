'use strict'

var test = require('ava')
var DateFormatter = require('..')

test('x', (t) => {
  var date = new Date()
  date.setTime(951879845001)
  var dateFormatter = new DateFormatter('x')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '951879845001')
})

test('x with caching', (t) => {
  var date = new Date()
  date.setTime(951879845001)
  var dateFormatter = new DateFormatter({
    dateFormat: 'x',
    cache: true
  })

  var formatted = dateFormatter.format(date)

  t.is(dateFormatter.cache, '951879845001')
  t.is(formatted, '951879845001')
})

test.cb('should call _clearCache x with caching', (t) => {
  t.plan(2)
  var date = new Date()
  date.setTime(951879845001)
  var dateFormatter = new DateFormatter({
    dateFormat: 'x',
    cache: true
  })

  dateFormatter.format(date)

  t.not(dateFormatter.cache, null)
  setTimeout(() => {
    t.is(dateFormatter.cache, null)
    t.end()
  }, 1250)
})

test('x with caching no date given', (t) => {
  var dateFormatter = new DateFormatter({
    dateFormat: 'x',
    cache: true
  })

  var formatted = dateFormatter.format()

  t.truthy(dateFormatter.cache)
  t.truthy(formatted)
})

test('YYYYMMDD', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YYYYMMDD')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '20000301')
})

test('YYYY-MM-DDTHH:mm:ss', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YYYY-MM-DDTHH:mm:ss')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '2000-03-01T03:04:05')
})

test('YYYY-MM-DDTHH:mm:ss,SSS', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YYYY-MM-DDTHH:mm:ss,SSS')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '2000-03-01T03:04:05,001')
})

test('x with no date given', (t) => {
  var dateFormatter = new DateFormatter('x')

  var formatted = dateFormatter.format()

  t.truthy(formatted)
})
