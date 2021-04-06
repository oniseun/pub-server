
const config = require('../config/config')
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( config.db );

module.exports = myCache