'use strict'

module.exports = async function dbRoutes (fastify, _opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: async function query (request, reply) {
      const res = await this.postgresDataSource.listDb()
      return res
    }
  })

}
