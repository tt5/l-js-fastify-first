'use strict'

const fp = require('fastify-plugin')
const fastifyPostgres = require('@fastify/postgres')

module.exports = fp(async function datasourcePlugin (fastify, opts) {
  fastify.register(fastifyPostgres, {
    connectionString: fastify.secrets.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
}, {
  dependencies: ['application-config']
})
