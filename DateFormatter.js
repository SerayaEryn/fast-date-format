'use strict'

const dayCount = require('./lib/days').dayCount
const tokenizer = require('./lib/tokenizer')
const { generateOffset, generateOffsetColon } = require('./lib/offset')
const genfun = require('generate-function')
const localeEN = require('./lib/locales/en')
const localeDE = require('./lib/locales/de')

const formatSym = Symbol('fast-data-format.format')
const dayCountSym = Symbol('fast-data-format.dayCount')
const localesSym = Symbol('fast-data-format.locales')

class DateFormatter {
  constructor (options) {
    const dateFormat = typeof options === 'string' ? options : options.dateFormat
    if (typeof options === 'string') {
      options = {}
    }
    this._clearCache = this._clearCache.bind(this)
    this[dayCountSym] = dayCount
    this[localesSym] = {}
    this.addLocale('de', localeDE)
    this.addLocale('en', localeEN)
    this.setLocale(options.locale || 'en')
    this[formatSym] = buildFormatter(dateFormat, options).bind(this)
  }

  format (now = new Date()) {
    return this[formatSym](now, this[dayCountSym])
  }

  addLocale (language, localeData) {
    localeData.monthsShort = localeData.months.map(toThreeLetters)
    localeData.weekdaysShort = localeData.weekdays.map(toThreeLetters)
    this[localesSym][language] = localeData
  }

  setLocale (language) {
    this.months = this[localesSym][language].months
    this.weekdays = this[localesSym][language].weekdays
    this.monthsShort = this[localesSym][language].monthsShort
    this.weekdaysShort = this[localesSym][language].weekdaysShort
  }

  _clearCache () {
    this.cache = null
  }
}

function buildFormatter (dateFormat, options) {
  var tokens = tokenizer.tokenize(dateFormat)
  const gen = genfun()
  gen('function format (now, dayCount) {')
  generateVariables(tokens, gen)
  if (options.cache) {
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
  dddd: '${this.weekdays[now.getDay()]}',
  ddd: '${this.weekdaysShort[now.getDay()]}',
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

function toThreeLetters (string) {
  return string.substring(0, 3)
}

function generateDayOfYear (gen) {
  gen(`let isLeapYear = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
  let dayOfYear = dayCount[month] + date
  if (month > 1 && isLeapYear) {
    dayOfYear++
  }`)
}

module.exports = DateFormatter
