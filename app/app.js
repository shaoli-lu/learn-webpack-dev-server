//const validator = require('validator')
//import validator from 'validator'

import isEmail from 'validator/lib/isEmail'
import tripleMe from './tripleMe'
console.log(isEmail('john@aol.com'))
console.log(tripleMe(100))

if (module.hot) {
    module.hot.accept()
}