'use strict'

const oauthPlugin = require('@fastify/oauth2')

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
    callbackUri: process.env.NODE_ENV=="production" ? 'https://tt15551.cc/api/login/github/callback' : 'http://localhost:3000/api/login/github/callback'
  })

  fastify.get('/', async function welcomeHandler (req, rep) {
    return { root: true }
  })

  fastify.get('/login/github/callback', async (req, rep) => {

    const token = await fastify.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(req)

    rep.redirect('http://localhost:8000')
    const res = await fetch("https://api.github.com/user", {
      headers: {
        "authorization": `Bearer ${token.token.access_token}`
      }
    })
      //rep.log.info(`token: ${token.token.access_token}`)
      const user = await res.json()
      rep.log.info(`user: ${user.login}`)
      rep.sse({data: "new user"})
    //return {"user": user}
  })
}


