'use strict'

import oauthPlugin from '@fastify/oauth2'

module.exports = async function root (fastify, opts) {

  fastify.register(oauthPlugin, {
    name: 'githubOAuth2',
    credentials: {
      client: {
        id: process.env.GITHUB_ID,
        secret: process.env.GITHUB_SECRET
      },
      auth: oauthPlugin.GITHUB_CONFIGURATION
    },
    startRedirectPath: '/login/github',
    callbackUri: 'http://localhost:3000/login/github/callback'
  })

  fastify.get('/', async function welcomeHandler (request, reply) {
    return { root: true }
  })

  fastify.get('/login/github/callback', async (req, rep) => {

    const token = await fastify.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(req)

    return {hello: token}
  })
}


