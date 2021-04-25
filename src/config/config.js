const config = {}
const dotenv = require("dotenv");
const path = require("path");
const fs = require('fs');
const envfile = path.resolve(__dirname,`../../.env`)

if (fs.existsSync(envfile)) {
    dotenv.config()
}


config.app = {
    name: "Pub-server",
    env: process.env.NODE_ENV|| 'development',
    port: process.env.PORT || 8000,
    logLevel: process.env.APP_LOG_LEVEL || 'debug'
    
}

config.db = {
  stdTTL: process.env.DB_TTL || 3600,
  checkperiod: process.env.DB_CHECK_PERIOD || 600
}

module.exports = config;
