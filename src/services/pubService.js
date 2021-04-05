


const pjson = require('../../package.json')
const config = require('../config/config')
const Subscription = require('../models/Subscription')
const enums = require('../config/enums')
const Publish = require('../models/Publish')
const Notification = require('../models/Notification')
const dbService =  require('../services/DbService')
const httpService = require('../services/HttpService')
const Subscriber = require('../models/Subscriber')
const LOG_PREFIX = 'PubService: '
const subsCollection = 'subscriptions' // subscription collection
const topicsCollection = 'topics' // topics collection


module.exports.getHeath = () => {
  const { name, description, version } = pjson;
  return { name, description, version, env: config.app.env, stats: dbService.getStats(), keys: dbService.keys()}
} 

module.exports.subscribe = ( topic, url ) => {

  const key = `${subsCollection}_${topic}`;
  const subscription = new Subscription(topic, url)
  let success = false;

  if (!dbService.has(key)) {
    success = dbService.set(key, [subscription])
  } else {
    const subscriptions = dbService.get(key)
    const urlExist = subscriptions.find(sub => sub.url == url)
    if (!urlExist) {
      subscriptions.push(subscription)
      success = dbService.set(key, subscriptions)
    } else {
      console.log(`${LOG_PREFIX} url:${url} already subscribed to topic:${topic}`)
    }
  }
  if (success) {
    console.log(`${LOG_PREFIX} url:${url} Successfully subscribed to topic:${topic}`)
    return subscription
  }
  console.log(`${LOG_PREFIX} url:${url} subscription to topic:${topic} FAILED`, success)
  return success
  
}

module.exports.getSubscribers = ( topic ) => {
  const key = `${subsCollection}_${topic}`;

  const response = dbService.get(key)

  return !response ? [] : response.map( sub => new Subscriber(sub.url)) 

}

module.exports.publish = async ( topic, data ) => {

  const subscribers = module.exports.getSubscribers(topic); 

  dbService.set(`${topicsCollection}_${topic}`, new Publish(topic, data))
  const [ SUCCESSFUL_PUBLISH, FAILED_PUBLISH ] = [[], []]

  if (subscribers.length === 0 ) { // no subscribers
    const message = enums.PUBLISH_NO_SUBSCRIBERS + topic
    console.info(`${LOG_PREFIX}publishTopicNoSubscribers => no subscribers found for topic:${topic}`);
    const stats = { topic, data, SUCCESSFUL_PUBLISH, FAILED_PUBLISH, subscribers }
    return new Notification(false, topic, message, stats )
  }
  const promiseArray = subscribers.map( sub => { 
    
    return httpService(sub.url, {}, 'POST', { data })
    .then( () => {
      console.info(`${LOG_PREFIX}publishTopicSuccess => has notified url:${sub.url} with topic:${topic} data`);
      SUCCESSFUL_PUBLISH.push(sub.url);
    })
    .catch(err => {
      console.error(`${LOG_PREFIX}publishTopicFailed => could not reach url:${sub.url} with topic:${topic} data`, err )
      FAILED_PUBLISH.push(sub.url)
    })
  
  })

  await Promise.all(promiseArray);

  const message = (SUCCESSFUL_PUBLISH.length > 0 ? enums.PUBLISH_SUCCESS : enums.PUBLISH_FAILED ) + topic

  const stats = { topic, data, SUCCESSFUL_PUBLISH, FAILED_PUBLISH, subscribers }

  return SUCCESSFUL_PUBLISH.length > 0  ? new Notification(true, topic, message, stats ) : new Notification(false, topic, message, stats)
  
}