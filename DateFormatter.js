'use strict'

const months = require('./lib/months').months
const monthsShort = require('./lib/months').monthsShort
const days = require('./lib/days').days
const daysShort = require('./lib/days').daysShort
const dayCount = require('./lib/days').dayCount
const tokenizer = require('./lib/tokenizer')
const { generateOffset, generateOffsetColon } = require('./lib/offset')
const genfun = require('generate-function')

const format = Symbol('format')

class DateFormatter {
  constructor (options) {
    const dateFormat = typeof options === 'string' ? options : options.dateFormat
    this.dayCount = dayCount
    this.daysShort = daysShort
    this.days = days
    this.monthsShort = monthsShort
    this.months = months
    this.dayCount = dayCount
    this._clearCache = this._clearCache.bind(this)
    this[format] = buildFormatter(dateFormat, options).bind(this)
  }

  format (date = new Date()) {
    return this[format](date)
  }

  _clearCache () {
    this.cache = null
  }
}

function buildFormatter (dateFormat, options) {
  var tokens = tokenizer.tokenize(dateFormat)
  const gen = genfun()
  gen('function format (now) {')
  generateVariables(tokens, gen)
  if (options.cache && !hasToken(tokens, 'SSS')) {
    gen(`
    if (!this.cache) {
      this.cache = \`${tokens.map(processToken).join('')}\`
      setTimeout(this._clearCache, 1000 - now.getMilliseconds())
    }
    return this.cache
    `)
  } else {
    gen('return `' + tokens.map(processToken).join('') + '`')
  }
  gen('}')
  // console.log(gen.toString())
  return gen.toFunction()
}

/* eslint-disable no-template-curly-in-string */
const tokenToReplacement = {
  ZZ: '${offsetWithColon[now.getTimezoneOffset() + 720]}',
  Z: '${offsetWithoutColon[now.getTimezoneOffset() + 720]}',
  SSS: '${milliseconds < 100 ? \'0\' : \'\'}${milliseconds < 10 ? \'0\': \'\'}${milliseconds}',
  ss: '${seconds < 10 ? \'0\' : \'\'}${seconds}',
  s: '${seconds}',
  mm: '${minutes < 10 ? \'0\': \'\'}${minutes}',
  m: '${minutes}',
  E: '${now.getDay() + 1}',
  dddd: '${this.days[now.getDay()]}',
  ddd: '${this.daysShort[now.getDay()]}',
  x: '${now.getTime()}',
  HH: '${hours < 10 ? \'0\': \'\'}${hours}',
  H: '${hours}',
  hh: '${hours12 < 10 ? \'0\': \'\'}${hours12}',
  h: '${hours12}',
  kk: '${hours1 < 10 ? \'0\': \'\'}${hours1}',
  k: '${hours1}',
  A: '${hours < 12 ? \'am\' : \'pm\'}',
  DDDD: '${dayOfYear < 100 ? \'0\' : \'\'}${dayOfYear < 10 ? \'0\': \'\'}${dayOfYear}',
  DDD: '${dayOfYear}',
  DD: '${date < 10 ? \'0\': \'\'}${date}',
  D: '${date}',
  MMMM: '${this.months[month]}',
  MMM: '${this.monthsShort[month]}',
  MM: '${month < 9 ? \'0\': \'\'}${month + 1}',
  M: '${month + 1}',
  YYYY: '${year}',
  YY: '${year.toString().substring(2)}'
}
/* eslint-enable no-template-curly-in-string */

function generateVariables (tokens, gen) {
  if (hasToken(tokens, 'Z')) {
    generateOffset(gen)
  }
  if (hasToken(tokens, 'ZZ')) {
    generateOffsetColon(gen)
  }
  if (hasToken(tokens, 'SSS')) {
    gen('const milliseconds = now.getMilliseconds()')
  }
  if (hasToken(tokens, 's') || hasToken(tokens, 'ss')) {
    gen('const seconds = now.getSeconds()')
  }
  if (hasToken(tokens, 'm') || hasToken(tokens, 'mm')) {
    gen('const minutes = now.getMinutes()')
  }
  if (hasToken(tokens, 'H') || hasToken(tokens, 'HH') || hasToken(tokens, 'A') || hasToken(tokens, 'h') || hasToken(tokens, 'hh')) {
    gen('const hours = now.getHours()')
  }
  if (hasToken(tokens, 'D') || hasToken(tokens, 'DD') || hasToken(tokens, 'DDD') || hasToken(tokens, 'DDDD')) {
    gen('const date = now.getDate()')
  }
  if (hasToken(tokens, 'YY') || hasToken(tokens, 'YYYY') || hasToken(tokens, 'DDD') || hasToken(tokens, 'DDDD')) {
    gen('const year = now.getFullYear()')
  }
  if (hasToken(tokens, 'k') || hasToken(tokens, 'kk')) {
    gen('const hours1 = now.getHours() + 1')
  }
  if (hasToken(tokens, 'h') || hasToken(tokens, 'hh')) {
    gen('const hours12 = (hours + 11) % 12 + 1')
  }
  if (hasToken(tokens, 'M') || hasToken(tokens, 'MM') || hasToken(tokens, 'MMM') || hasToken(tokens, 'MMMM') || hasToken(tokens, 'DDD') || hasToken(tokens, 'DDDD')) {
    gen('const month = now.getMonth()')
  }
  if (hasToken(tokens, 'DDD') || hasToken(tokens, 'DDDD')) {
    generateDayOfYear(gen)
  }
}

function processToken (token) {
  if (!token.escaped && tokenToReplacement[token.token]) {
    return tokenToReplacement[token.token]
  }
  return token.token
}

function hasToken (tokens, wantedToken) {
  return tokens.some((token) => {
    return token.token === wantedToken &&
      !token.escaped
  })
}

function generateDayOfYear (gen) {
  gen(`let isLeapYear = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
  let dayOfYear = this.dayCount[month] + date
  if (month > 1 && isLeapYear) {
    dayOfYear++
  }`)
}

module.exports = DateFormatter
