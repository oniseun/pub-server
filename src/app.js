'use strict'
const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
app.use(express.json({limit: '20mb'}));

app.use(helmet())
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST']
  }))
morgan.token('payload', (req) => `${JSON.stringify(req.params)} - ${JSON.stringify(req.query)}`)
const logger = morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":payload"')
app.use(logger)

require('./routes')(app)


module.exports = app
