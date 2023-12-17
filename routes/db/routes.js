'use strict'

module.exports = async function dbRoutes (fastify, _opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: async function query (request, reply) {
      const res = await this.postgresDataSource.queryDb('SELECT * FROM mytable')
      return res
    }
  })

  fastify.route({
    method: 'GET',
    url: '/put/:item',
    handler: async function query (request, reply) {
      const { item } = request.params
      const res = await this.postgresDataSource.queryDb(`INSERT INTO mytable (one) VALUES ('${item}') RETURNING *;`)
      return res
    }
  })

  fastify.route({
    method: 'GET',
    url: '/delete/:col/:item',
    handler: async function query (request, reply) {
      const { col, item } = request.params
      const res = await this.postgresDataSource.queryDb(`DELETE FROM mytable WHERE ${col}='${item}' RETURNING *;`)
      return res
    }
  })
}
