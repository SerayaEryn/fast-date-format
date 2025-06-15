import test from 'ava'
import { DateFormatter } from '../lib/DateFormatter.mjs'

test('YYYY', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YYYY')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '2000')
})

test('YY - 2000', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YY')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '00')
})

test('YY - 2001', (t) => {
  var date = new Date(2001, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YY')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '01')
})

test('YY - 2011', (t) => {
  var date = new Date(2011, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YY')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '11')
})

test('YY - 1900', (t) => {
  var date = new Date(1900, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YY')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '00')
})

test('YY - 1901', (t) => {
  var date = new Date(1901, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YY')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '01')
})

test('YY - 1911', (t) => {
  var date = new Date(1911, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YY')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '11')
})

test('YY - 1811', (t) => {
  var date = new Date(1811, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YY')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '11')
})