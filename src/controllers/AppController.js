
const pubService = require('../services/PubService')
const { StatusCodes } = require('http-status-codes')
const enums = require('../config/enums')

module.exports.getHealth =  (req, res) => {

  return res.status(StatusCodes.OK).json(pubService.getHeath())

}

module.exports.subscribe = (req, res) => {

  const { params: { topic }, body: { url } } = req

  const response = pubService.subscribe(topic, url)
  
  if (!response) {
    return res.status(StatusCodes.BAD_GATEWAY).json({ message: `${enums.SUBSCRIPTION_FAILED}${topic}`})
  }
  return res.status(StatusCodes.CREATED).json(response)
}

module.exports.getSubscribers = (req, res) => {

  const { params: { topic } } = req

  const subscribers = pubService.getSubscribers(topic)
 
  const stCode = subscribers.length === 0 ?  StatusCodes.NO_CONTENT : StatusCodes.OK
  
  return res.status(stCode).json({ subscribers })
}

module.exports.publishTopic = async(req, res) => {

  const { params: { topic }, body: { data } } = req

  const response = await pubService.publish(topic, data)

  const stCode = response.success ? StatusCodes.OK : StatusCodes.SERVICE_UNAVAILABLE

  return res.status(stCode).json(response)
  
}
