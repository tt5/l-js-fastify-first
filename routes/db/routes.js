'use strict'
const {FastifySSEPlugin} = require('fastify-sse-v2')

module.exports = async function dbRoutes (fastify, _opts) {
  fastify.register(FastifySSEPlugin);

  fastify.route({
    method: 'GET',
    url: '/sse',
    handler: async function query (request, reply) {
      const res = await this.postgresDataSource.queryDb(`SELECT * FROM mytable`)
      reply.headers({
        "Access-Control-Allow-Origin": "*"
      })
      reply.sse({data: JSON.stringify(res)})
      //reply.sseContext.source.end()
    }
  })

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
    url: '/put/:col/:item',
    handler: async function query (request, reply) {
      var { col, item } = request.params
      const clean=/[^\w]*/g
      item = item.replace(clean,'')
      col = col.replace(clean,'')
      const string = `INSERT INTO mytable (${col}) VALUES ('${item}') RETURNING *;`
      const res = await this.postgresDataSource.queryDb(string)
      return res
    }
  })

  fastify.route({
    method: 'GET',
    url: '/setcol/:col',
    handler: async function query (request, reply) {
      var { col } = request.params
      const clean=/[^\w]*/g
      col = col.replace(clean,'')
      const string = `ALTER TABLE mytable ADD "${col}" VARCHAR(20);`
      const res = await this.postgresDataSource.queryDb(string)
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
