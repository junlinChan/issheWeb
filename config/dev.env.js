'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.80.141:8000/"'
  // BASE_API: '"http://39.97.118.148:8000/"'
  BASE_API: '"http://192.168.80.146:8000/"'
})
