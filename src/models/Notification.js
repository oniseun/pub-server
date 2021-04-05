module.exports = class Notification {
 
    constructor(success, topic, message,  stats) {
        this.success = success
        this.topic = topic
        this.message = message
        this.stats = stats
    }
} 