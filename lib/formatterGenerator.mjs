import { EOL } from 'os'

export class Generator {
  constructor () {
    this.code = ''
  }

  add (code) {
    this.code += code
    this.code += EOL
  }

  toFunction () {
    var src = 'return (' + this.code + ')'
    /* eslint-disable-next-line no-useless-call */
    return Function.apply(null, [src]).apply(null)
  }
}
