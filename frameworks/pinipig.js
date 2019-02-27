const pinipig = require('pinipig')
const stringify =  require('fast-stringify').default

let routes = [
    {
        url:'/',
        get: (ctx) => {
            ctx.res.end( stringify({hello:'world'}) )
        }
    }
]

pinipig.createServer({port:9090,routes})