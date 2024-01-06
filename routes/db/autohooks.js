'use strict'
const fp = require('fastify-plugin')
const schemas = require('./schemas/loader')

module.exports = fp(async function dbAutoHooks (fastify, opts) {

  fastify.register(schemas)

  fastify.decorate('postgresDataSource', {
    async queryDb (q) {
      const db = await fastify.pg.connect()
      const { rows } = await db.query(q)
      db.release()
      //return {text: text, values: values}
      return rows
    },
  })
}, {
  encapsulate: true,
  dependencies: ['@fastify/postgres'],
  name: 'db-store'
})
