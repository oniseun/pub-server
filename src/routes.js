'use strict'
const AppController = require('./controllers/AppController')
const validator = require('express-joi-validation').createValidator({ passError: true})
const publishSchema = require('./models/validators/publishSchema');
const subscribeSchema = require('./models/validators/subscribeSchema');

module.exports = function(app) {
///////////////////////
// HEALTH CHECK
///////////////////////
app.get('/', AppController.getHealth)
app.get('/health', AppController.getHealth)


/// ////////////////////////
// SERVICE ROUTES
/// ////////////////////////

app.post('/publish/:topic', validator.params(publishSchema.params), validator.body(publishSchema.body), AppController.publishTopic)
app.post('/subscribe/:topic', validator.params(subscribeSchema.params), validator.body(subscribeSchema.body), AppController.subscribe)
app.get('/subscribers/:topic', AppController.getSubscribers)

}