'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')

module.exports = async function (fastify, opts) {
  fastify.server.keepAliveTimeout = 0;
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'schemas'),
    indexPattern: /^loader.js$/i
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    dirNameRoutePrefix: false,
    ignorePattern: /.*.no-load\.js/,
    // ignorePattern: /^((?!load\.js).)*$/,
    indexPattern: /^no$/i,
    options: { ...opts }
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    indexPattern: /.*routes(\.js|\.cjs)$/i,
    ignorePattern: /.*\.js/,
    autoHooksPattern: /.*hooks(\.js|\.cjs)$/i,
    autoHooks: true,
    cascadeHooks: true,
    options: Object.assign({prefix: '/api'}, opts)
  })
}

module.exports.options = require('./configs/server-options')
