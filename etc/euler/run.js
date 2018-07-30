require('babel-register')({
    presets: [ 'env' ]
})

module.exports = require(`./${process.argv[2]}.js`)
