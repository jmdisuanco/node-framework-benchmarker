'use strict'
const config = require('../config.json')
const server = require('http').createServer(function (req, res) {
  res.end(JSON.stringify({
    hello: 'world'
  }))
})

server.listen(config.port, () => {
  console.log('bare')
})