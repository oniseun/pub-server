
const utils = require('../utils/utils')
const enums = require('../config/enums')
const LOG_PREFIX = 'AppController: '
const AppResponse = require('../models/AppResponse')
const config = require('../config/config')

module.exports.getHealth =  async (req, res) => {

  return res.status(202).json(new AppResponse( true, enums.RESPONSE_MSG.REQUEST_SENT_FOR_APPROVAL ))
}

module.exports.subscribe = async (req, res) => {
  
  return res.status(200).json(new AppResponse( true , enums.RESPONSE_MSG.REPORT_FOUND, { reportInfo, transactionInfo } ))
}

module.exports.getSubscribers = async(req, res) => {

  return res.status(202).json(new AppResponse( true, enums.RESPONSE_MSG.APPROVE_RECONCILIATION ))
}

module.exports.publishTopic = async(req, res) => {

  return res.status(202).json(new AppResponse( true, enums.RESPONSE_MSG.APPROVE_RECONCILIATION ))
}
