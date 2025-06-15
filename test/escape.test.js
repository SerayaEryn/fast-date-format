import test from 'ava'
import { DateFormatter } from '../lib/DateFormatter.mjs'

test('should respect escaped chars', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('[GMT]')

  var formatted = dateFormatter.format(date)

  t.is(formatted, 'GMT')
})

test('should allows square brackets in escaped chars', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('[[GMT]')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '[GMT')
})

test('should ignore tokens in escaped text', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YYYY-MM-DDTHH:mm:ss.sss[Z]')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '2000-03-01T03:04:05.sssZ')
})
