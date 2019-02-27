'use strict'

require('make-promises-safe')
const config = require('../config.json')
const Hapi = require('hapi')

async function start() {
  const server = Hapi.server({
      port: config.port,
      debug: false
    }

  )

  server.route({
    method: 'GET',
    path: '/',
    config: {
      cache: false,
      response: {
        ranges: false
      },
      state: {
        parse: false
      }
    },
    handler: function (request, h) {
      return {
        hello: 'world'
      }
    }
  })

  await server.start()
  console.log('hapi')
}

start()