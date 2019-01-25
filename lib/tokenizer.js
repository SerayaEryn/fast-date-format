'use strict'

function tokenize (dateFormat) {
  var tokens = []
  var token = ''

  var size = dateFormat.length

  var nextChar = dateFormat.charAt(0)
  var char
  var escape = false
  for (var index = 0; index < size; index++) {
    char = nextChar
    nextChar = dateFormat.charAt(index + 1)
    if (char === '[' && !escape) {
      escape = true
      continue
    }
    if (char === ']' && escape) {
      escape = false
      tokens.push({ token, escaped: true })
      token = ''
      continue
    }
    token += char
    if (nextChar !== char && !escape) {
      tokens.push({ token, escaped: false })
      token = ''
    }
  }
  return tokens
}

module.exports = {
  tokenize
}
