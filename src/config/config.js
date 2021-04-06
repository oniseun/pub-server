const config = {}
const dotenv = require("dotenv");
const result = dotenv.config()
 
if (result.error) {
  throw result.error
}
 
//console.log(result.parsed)

config.app = {
    name: "Pub-server",
    env: process.env.NODE_ENV|| 'development',
    port: process.env.PORT || 9000,
    logLevel: process.env.APP_LOG_LEVEL || 'debug'
    
}

config.db = {
  stdTTL: process.env.DB_TTL || 3600,
  checkperiod: process.env.DB_CHECK_PERIOD || 600
}

module.exports = config;
