'use strict'

module.exports = async function dbRoutes (fastify, _opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: async function query (request, reply) {
      const res = await this.postgresDataSource.queryDb(`SELECT * FROM mytable`)
      return res
    }
  })

  fastify.route({
    method: 'GET',
    url: '/put/:item',
    handler: async function query (request, reply) {
      var { item } = request.params
      const clean=/[^\w]*/g
      item = item.replace(clean,'')
      const res = await this.postgresDataSource.queryDb(`INSERT INTO mytable (one) VALUES ('${item}') RETURNING *;`)
      return res
    }
  })

  fastify.route({
    method: 'GET',
    url: '/delete/:col/:item',
    handler: async function query (request, reply) {
      var { col, item } = request.params
      const clean=/[^\w]*/g
      col = col.replace(clean,'')
      item = item.replace(clean,'')
      const res = await this.postgresDataSource.queryDb(`DELETE FROM mytable WHERE ${col}='${item}' RETURNING *;`)
      return res
    }
  })
}
