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
    port: 9090,
    routes
})