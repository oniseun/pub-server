


const pjson = require('../../package.json')
const config = require('../config/config')


module.exports.heathCheck = () => {
  const { name, description, version } = pjson;
  return { name, description, version, env: config.app.env }
} 

module.exports.subscribe = async ( payload ) => {

}

module.exports.topicSubsribers = async ( topic ) => {

}

module.exports.publishTopic = async ({ url, topic }) => {
}

module.exports.subscribeToTopic = async ({ url, topic }) => {
}