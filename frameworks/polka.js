const polka = require('polka');
const config = require('../config.json')

function hello(req, res, next) {
  req.hello = 'world';
  next();
}


polka()
  .use(hello)
  .get('/users/:id', (req, res) => {
    res.end(`User: ${req.params.id}`);
  })
  .listen(config.port, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${config.port}`);
  });