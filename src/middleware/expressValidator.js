const VelidationError = require('../models/ValidationError')
const { StatusCodes } = require('http-status-codes')

module.exports = function expressValidator(err,req, res, next) {  

    if (err && err.error && err.error.isJoi) {
        console.log('validation error::',err)
        // we had a joi error, let's return a custom 400 json response
        return res.status(StatusCodes.BAD_REQUEST).json( new VelidationError(err.error.toString(), [err]));

      } else {
        // pass on to another error handler
        next(err);
      }
    
}
