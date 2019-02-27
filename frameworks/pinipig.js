'use strict'
const config = require('../config.json')
const pinipig = require('pinipig')

let routes = [{
    url: '/',
    get: (ctx) => {
        ctx.res.json({
            hello: 'world'
        })
    }
}]

pinipig.createServer({
    port: config.port,
    routes
})