import test from 'ava'
import { DateFormatter } from '../lib/DateFormatter.mjs'

test('YYYY', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YYYY')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '2000')
})

test('YY', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YY')

  var formatted = dateFormatter.format(date)

  t.is(formatted, '00')
})
