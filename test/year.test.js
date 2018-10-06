'use strict'

var t = require('tap')
var test = t.test
var DateFormatter = require('..')

test('YYYY', (t) => {
  t.plan(1)
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YYYY')

  var formatted = dateFormatter.format(date)

  t.strictEquals(formatted, '2000')
})

test('YY', (t) => {
  t.plan(1)
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YY')

  var formatted = dateFormatter.format(date)

  t.strictEquals(formatted, '00')
})
