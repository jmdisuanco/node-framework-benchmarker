'use strict'
const config = require('../config.json')
const fastify = require('fastify')()

const schema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string'
          }
        }
      }
    }
  }
}

fastify.get('/', schema, function (req, reply) {
  reply.send({
    hello: 'world'
  })
})

fastify.listen(config.port)
console.log(`fastify on port ${config.port}`)