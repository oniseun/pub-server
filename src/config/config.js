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
    port: process.env.PORT || 8000,
    logLevel: process.env.APP_LOG_LEVEL || 'debug'
}

module.exports = config;
