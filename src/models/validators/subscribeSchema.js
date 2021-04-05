// validation middleware
const Joi = require('joi');

module.exports = {
    
    "params": Joi.object({
        topic: Joi.string().min(3).max(30).required()
    }),

    "body": Joi.object({
        url: Joi.string().uri().required()
    })

}
