'use strict'

const config = require('../config.json')
const express = require('express')

const app = express()


app.get('/', function (req, res) {
  res.json({
    hello: 'world'
  })
})

app.listen(config.port, () => console.log(`express on port ${config.port}`))