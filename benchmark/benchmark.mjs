import Benchmark from 'benchmark'
import moment from 'moment'
import dateFormat from 'dateformat'
import format from 'date-format'
import fecha from 'fecha'
import speedDate from 'speed-date'
import { format as dateFnsFormat } from 'date-fns-tz'
import { DateFormatter } from '../lib/DateFormatter.mjs'

const DATE_FORMAT = 'YYYY.MM.DDTHH:mm:ss,SSS ZZ'
const dateFormatter = new DateFormatter(DATE_FORMAT)
const speedDateFormatter = speedDate(DATE_FORMAT)

const suite = new Benchmark.Suite()

suite
  .add('moment', () => {
    moment().format(DATE_FORMAT)
  })
  .add('date-format', () => {
    format('yyyy.MM.ddThh:mm:ss,SSS O', new Date())
  })
  .add('dateformat', () => {
    dateFormat(new Date(),  'yyyy.mm.dd\'T\'HH:MM:ss,l o')
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
