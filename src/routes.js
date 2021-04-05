'use strict'
const AppController = require('./controllers/AppController')


module.exports = function(app) {
///////////////////////
// HEALTH CHECK
///////////////////////
app.get('/', AppController.getHealth)
app.get('/health', AppController.getHealth)


/// ////////////////////////
// SERVICE ROUTES
/// ////////////////////////
app.post('/publish/:topic', AppController.publishTopic)
app.post('/subscribe/:topic', AppController.subscribe)
app.get('/subscribers/:topic', AppController.getSubscribers)


}