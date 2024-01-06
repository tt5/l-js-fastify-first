'use strict'
const fp = require('fastify-plugin')
const schemas = require('./schemas/loader')
const { sql } = require('squid/pg')

module.exports = fp(async function dbAutoHooks (fastify, opts) {

  fastify.register(schemas)

  fastify.decorate('postgresDataSource', {
    async queryDb (q) {
      const db = await fastify.pg.connect()
      const { rows } = await db.query(sql`${q}`)
      db.release()
      return rows
    },
  })
}, {
  encapsulate: true,
  dependencies: ['@fastify/postgres'],
  name: 'db-store'
})
