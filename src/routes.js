'use strict'
const AppController = require('./controllers/AppController')


module.exports = function(app) {
///////////////////////
// HEALTH CHECK
///////////////////////
app.get('/',        AppController.health)
app.get('/health',  AppController.health)


/// ////////////////////////
// SERVICE ROUTES
/// ////////////////////////
app.post('/publish/:topic', AppController.publishTopic)
app.post('/subscribe/:topic',AppController.subscribe)
app.get('/subscriptions/:topic', AppController.getSubscribers)


}