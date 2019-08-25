'use strict'

const createRegressionBenchmark = require('@clevernature/benchmark-regression')
const DateFormatter = require('..')

const benchmarks = createRegressionBenchmark(DateFormatter, ['fast-date-format@latest'])

benchmarks.add(
  'format with timezone offset',
  (client, formatter) => formatter.format(new Date()),
  { setup: (CurrentDateFormat) => {
    const DATE_FORMAT = 'YYYY.MM.DDTHH:mm:ss,SSS ZZ'
    return new CurrentDateFormat(DATE_FORMAT)
  } }
)
benchmarks.add(
  'format',
  (client, formatter) => formatter.format(new Date()),
  { setup: (CurrentDateFormat) => {
    const DATE_FORMAT = 'YYYY.MM.DDTHH:mm:ss,SSS'
    return new CurrentDateFormat(DATE_FORMAT)
  } }
)

benchmarks.run().catch(err => {
  console.error(err.stack)
  process.exit(1)
})
